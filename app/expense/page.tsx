'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from '@/hooks/use-toast';
import { useOrganization, useOrganizationList, useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { addExpense } from '../actions';

// ... (rest of the code remains unchanged)

interface Organization {
  id: string;
  name: string;
}

interface Member {
  id: string;
  name: string;
}

interface SplitMember {
  id: string;
  name: string;
}

export default function AddExpense() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [group, setGroup] = useState('');
  const [splitPercentage, setSplitPercentage] = useState('');
  const [splitWith, setSplitWith] = useState<SplitMember[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [splitAmounts, setSplitAmounts] = useState<{ [key: string]: number }>({});

  const { user, isLoaded: isUserLoaded } = useUser();
  const { userMemberships, isLoaded: isOrgListLoaded } = useOrganizationList({
    userMemberships: true,
  });
  const { isLoaded: isOrgLoaded } = useOrganization();
  const { toast } = useToast();

  useEffect(() => {
    if (isOrgListLoaded && userMemberships.data) {
      const orgs = userMemberships.data.map((membership) => ({
        id: membership.organization.id,
        name: membership.organization.name,
      }));
      console.log('Organizations fetched:', orgs);
      setOrganizations(orgs);

      // Set the first organization as default and fetch its members
      if (orgs.length > 0 && !group) {
        const defaultOrgId = orgs[0].id;
        setGroup(defaultOrgId);
        fetchMembers(defaultOrgId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOrgListLoaded, userMemberships.data, group]);

  const fetchMembers = async (orgId: string) => {
    try {
      const org = await userMemberships.data?.find(
        (membership) => membership.organization.id === orgId
      )?.organization;
      if (org) {
        const memberships = await org.getMemberships();
        const membersList = memberships.data.map((membership) => ({
          id: membership.publicUserData.userId ?? '',
          name: membership.publicUserData.identifier ?? `Member (${membership.publicUserData.userId})`
        }));
        setMembers(membersList);
        console.log('Members fetched:', membersList);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch group members. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleGroupChange = (orgId: string) => {
    setGroup(orgId);
    fetchMembers(orgId);
    setSplitWith([]); // Reset split with when group changes
  };

  const calculateSplitAmounts = (totalAmount: number, members: SplitMember[]) => {
    if (members.length === 0) return {};
    
    const amountPerPerson = totalAmount / (members.length + 1); // +1 for the current user
    const splits: { [key: string]: number } = {};
    
    members.forEach((member) => {
      splits[member.id] = amountPerPerson;
    });
    
    return splits;
  };

  useEffect(() => {
    if (amount && splitWith.length > 0) {
      const totalAmount = parseFloat(amount);
      const splits = calculateSplitAmounts(totalAmount, splitWith);
      setSplitAmounts(splits);
    } else {
      setSplitAmounts({});
    }
  }, [amount, splitWith]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isUserLoaded || !user) {
      toast({
        title: 'Oops!',
        description:
          "You need to be logged in to add an expense. Let's get you signed in!",
        variant: 'destructive',
      });
      return;
    }

    const expenseData = {
      amount: parseFloat(amount),
      description,
      groupId: group,
      splitPercentage: parseFloat(splitPercentage),
      splitWith: splitWith.map((member) => ({
        id: member.id,
        name: member.name,
      })),
      createdBy: user.id,
    };

    try {
      const result = await addExpense(expenseData);
      if (result.success) {
        toast({
          title: 'Expense Added!',
          description:
            'Your expense has been successfully recorded. Great job!',
        });

        // Reset form
        setAmount('');
        setDescription('');
        setGroup('');
        setSplitPercentage('');
        setSplitWith([]);
      } else {
        throw new Error('Failed to add expense');
      }
    } catch (error: unknown) {
      console.error('Error adding expense:', error);
      toast({
        title: 'Uh-oh!',
        description: "We couldn't add your expense. Let's give it another try!",
        variant: 'destructive',
      });
    }
  };

  if (!isUserLoaded || !isOrgListLoaded || !isOrgLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">Add an expense</h1>
      <p className="text-gray-600 mb-6">
        Record your expenses and contri them with group.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount
          </Label>
          <Input
            id="amount"
            type="number"
            placeholder="£0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div>
          <Label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </Label>
          <Input
            id="description"
            placeholder="For which expense did you pay?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div>
          <Label
            htmlFor="group"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Group
          </Label>
          {organizations.length > 0 ? (
            <Select onValueChange={handleGroupChange} value={group} required>
              <SelectTrigger id="group" className="w-full">
                <SelectValue placeholder="Select a group" />
              </SelectTrigger>
              <SelectContent>
                {organizations.map((org) => (
                  <SelectItem key={org.id} value={org.id}>
                    {org.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="text-sm text-gray-500">
              No groups available. Please create a group.
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="splitPercentage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contribution Percentage
          </Label>
          <Input
            id="splitPercentage"
            type="number"
            placeholder="Enter percentage to split"
            value={splitPercentage}
            onChange={(e) => setSplitPercentage(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <Label
            htmlFor="splitWith"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contribute with
          </Label>
          <div className="border rounded-md p-4 space-y-2">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={member.id}
                    checked={splitWith.some((selected) => selected.id === member.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSplitWith([...splitWith, member]);
                      } else {
                        setSplitWith(splitWith.filter((selected) => selected.id !== member.id));
                      }
                    }}
                  />
                  <label
                    htmlFor={member.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {member.name}
                  </label>
                </div>
                {splitAmounts[member.id] && (
                  <span className="text-sm text-gray-500">
                    £{splitAmounts[member.id].toFixed(2)}
                  </span>
                )}
              </div>
            ))}
          </div>
          {splitWith.length > 0 && amount && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <h4 className="font-medium mb-2">Split Summary</h4>
              <p className="text-sm text-gray-600">
                Your share: £{(parseFloat(amount) / (splitWith.length + 1)).toFixed(2)}
              </p>
              {splitWith.map(member => (
                <p key={member.id} className="text-sm text-gray-600">
                  {member.name}: £{splitAmounts[member.id]?.toFixed(2)}
                </p>
              ))}
            </div>
          )}
        </div>

        <Button type="submit" className="w-full">
          Save Expense
        </Button>
      </form>
    </div>
  );
}
