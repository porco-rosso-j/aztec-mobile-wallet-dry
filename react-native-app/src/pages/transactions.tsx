import React from 'react';
import { Text, View } from 'react-native';
import constants from '../constants';
import { formatAddress } from '../scripts/index';
import { format } from 'date-fns';
import numeral from 'numeral';
import { ArrowDown, ArrowUp } from '@tamagui/lucide-icons';

const RANDOM_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
const RECIPIENT_ADDRESS = '0xaabbccddeeff00112233445566778899aabbccdd';

export const TRANSACTIONS = [
  {
    currency: 'USDC',
    amount: 400,
    recipient: RECIPIENT_ADDRESS,
    sender: RANDOM_ADDRESS,
    confirmed: false,
    date: new Date()
  },
  {
    currency: 'USDC',
    amount: 400,
    recipient: RECIPIENT_ADDRESS,
    sender: RANDOM_ADDRESS,
    date: new Date('2024-07-13T00:00:00Z'),
    confirmed: true
  },
  {
    currency: 'USDC',
    amount: 300,
    recipient: RANDOM_ADDRESS,
    sender: RECIPIENT_ADDRESS,
    date: new Date('2024-07-12T00:00:00Z'),
    confirmed: true
  },
  {
    currency: 'USDC',
    amount: 3000,
    recipient: RECIPIENT_ADDRESS,
    sender: RANDOM_ADDRESS,
    date: new Date('2024-07-11T00:00:00Z'),
    confirmed: true
  },
  {
    currency: 'USDC',
    amount: 200,
    recipient: RANDOM_ADDRESS,
    sender: RECIPIENT_ADDRESS,
    date: new Date('2024-07-11T00:00:00Z'),
    confirmed: true
  }
];

export default function TransactionItem({
  currency,
  amount,
  recipient,
  sender,
  date,
  confirmed
}: {
  currency: string,
  amount: number,
  recipient: string,
  sender: string,
  date: Date,
  confirmed: boolean
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 10,
        //paddingHorizontal: 15,
        alignItems: 'center',
        gap: 10,
        opacity: confirmed ? 1 : 0.2
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: constants.primaryColor
        }}
      >
        {recipient === RANDOM_ADDRESS ? (
          <ArrowDown color="white" />
        ) : (
          <ArrowUp color="white" />
        )}
      </View>
      <View>
        <Text
          style={{
            color: constants.lightTextColor,
            fontSize: 10
          }}
        >
          {recipient === RANDOM_ADDRESS ? 'From' : 'To'}
        </Text>
        <Text
          style={{
            color: constants.primaryColor,
            fontSize: 12,
            fontWeight: 'bold'
          }}
        >
          {formatAddress(recipient === RANDOM_ADDRESS ? sender : recipient)}
        </Text>
      </View>
      <View
        style={{
          marginLeft: 'auto',
          alignItems: 'flex-end'
        }}
      >
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <Text
            style={{
              color:
                recipient === RANDOM_ADDRESS
                  ? constants.redColor
                  : constants.greenColor,
              fontWeight: 'bold',
              fontSize: 18
            }}
          >
            {recipient === RANDOM_ADDRESS ? '-' : '+'}
            {numeral(amount).format('0,0.00')}
          </Text>
          <Text
            style={{
              color: constants.primaryColor,
              fontSize: 10,
              fontWeight: 'bold'
            }}
          >
            {currency}
          </Text>
        </View>
        <Text
          style={{
            color: constants.lightTextColor,
            fontSize: 10
          }}
        >
          {format(date, 'dd/MM/yyyy')}
        </Text>
      </View>
    </View>
  );
}
