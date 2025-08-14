'use client'

import React, { useState, useEffect } from 'react'
import { BondCalculation, BondFund } from '../types'
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard'
import Button from '@/app/components/ui/Button'

interface BondCalculatorProps {
  bondFunds?: BondFund[]
}

export default function BondCalculator({ bondFunds = [] }: BondCalculatorProps) {
  const [principal, setPrincipal] = useState<number>(5000)
  const [interestRate, setInterestRate] = useState<number>(0)
  const [termMonths, setTermMonths] = useState<number>(12)
  const [calculation, setCalculation] = useState<BondCalculation | null>(null)
  const [selectedFund, setSelectedFund] = useState<string>('')

  useEffect(() => {
    calculateBond()
  }, [principal, interestRate, termMonths])

  const calculateBond = () => {
    if (principal <= 0 || termMonths <= 0) return

    const monthlyRate = interestRate / 100 / 12
    let monthlyPayment: number
    let totalInterest: number

    if (interestRate === 0) {
      monthlyPayment = principal / termMonths
      totalInterest = 0
    } else {
      monthlyPayment = principal * 
        (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
        (Math.pow(1 + monthlyRate, termMonths) - 1)
      totalInterest = (monthlyPayment * termMonths) - principal
    }

    const totalAmount = principal + totalInterest

    // Generate payment schedule
    const paymentSchedule = []
    let remainingBalance = principal
    const today = new Date()

    for (let i = 1; i <= termMonths; i++) {
      const paymentDate = new Date(today)
      paymentDate.setMonth(today.getMonth() + i)

      const interestPayment = remainingBalance * monthlyRate
      const principalPayment = monthlyPayment - interestPayment
      remainingBalance -= principalPayment

      paymentSchedule.push({
        payment_number: i,
        payment_date: paymentDate.toISOString().split('T')[0],
        principal_payment: Math.round(principalPayment * 100) / 100,
        interest_payment: Math.round(interestPayment * 100) / 100,
        total_payment: Math.round(monthlyPayment * 100) / 100,
        remaining_balance: Math.max(0, Math.round(remainingBalance * 100) / 100)
      })
    }

    setCalculation({
      principal,
      interest_rate: interestRate,
      term_months: termMonths,
      monthly_payment: Math.round(monthlyPayment * 100) / 100,
      total_interest: Math.round(totalInterest * 100) / 100,
      total_amount: Math.round(totalAmount * 100) / 100,
      payment_schedule: paymentSchedule
    })
  }

  const getSelectedFundInfo = () => {
    if (!selectedFund) return null
    return bondFunds.find(fund => fund.id === selectedFund)
  }

  const fundInfo = getSelectedFundInfo()

  return (
    <div className="space-y-6">
      {/* Calculator Inputs */}
      <GlassmorphicCard blur="sm" opacity={0.05}>
        <div className="p-6 space-y-6">
          <h3 className="text-lg font-semibold text-ink">Bond Calculator</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray mb-2">
                Bond Amount ($)
              </label>
              <input
                type="number"
                min="100"
                step="100"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full px-4 py-2 bg-ink/10 border border-gray/20 rounded-lg 
                         text-ink focus:outline-none focus:border-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray mb-2">
                Interest Rate (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-4 py-2 bg-ink/10 border border-gray/20 rounded-lg 
                         text-ink focus:outline-none focus:border-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray mb-2">
                Term (Months)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                className="w-full px-4 py-2 bg-ink/10 border border-gray/20 rounded-lg 
                         text-ink focus:outline-none focus:border-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray mb-2">
                Select Fund
              </label>
              <select
                value={selectedFund}
                onChange={(e) => setSelectedFund(e.target.value)}
                className="w-full px-4 py-2 bg-ink/10 border border-gray/20 rounded-lg 
                         text-ink focus:outline-none focus:border-accent/50"
              >
                <option value="">No Fund Selected</option>
                {bondFunds.map(fund => (
                  <option key={fund.id} value={fund.id}>{fund.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => { setPrincipal(1000); setTermMonths(6); }}
            >
              $1,000 / 6 mo
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => { setPrincipal(5000); setTermMonths(12); }}
            >
              $5,000 / 12 mo
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => { setPrincipal(10000); setTermMonths(24); }}
            >
              $10,000 / 24 mo
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => { setPrincipal(25000); setTermMonths(36); }}
            >
              $25,000 / 36 mo
            </Button>
          </div>
        </div>
      </GlassmorphicCard>

      {/* Calculation Results */}
      {calculation && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Summary Cards */}
          <div className="lg:col-span-1 space-y-4">
            <GlassmorphicCard blur="sm" opacity={0.1}>
              <div className="p-6 space-y-4">
                <h4 className="font-semibold text-ink">Payment Summary</h4>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray">Monthly Payment:</span>
                    <span className="font-bold text-accent text-lg">
                      ${calculation.monthly_payment.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray">Total Interest:</span>
                    <span className="text-ink">
                      ${calculation.total_interest.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray">Total Amount:</span>
                    <span className="font-semibold text-ink">
                      ${calculation.total_amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </GlassmorphicCard>

            {fundInfo && (
              <GlassmorphicCard blur="sm" opacity={0.1}>
                <div className="p-6 space-y-4">
                  <h4 className="font-semibold text-ink">Fund Impact</h4>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray">Fund: </span>
                      <span className="text-ink">{fundInfo.name}</span>
                    </div>
                    <div>
                      <span className="text-gray">Available: </span>
                      <span className="font-semibold text-signal">
                        ${fundInfo.available_amount.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray">After This Bond: </span>
                      <span className={`font-semibold ${
                        fundInfo.available_amount - principal >= 0 ? 'text-signal' : 'text-red-500'
                      }`}>
                        ${(fundInfo.available_amount - principal).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {fundInfo.available_amount < principal && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-sm text-red-500">
                        ⚠️ Insufficient funds available
                      </p>
                    </div>
                  )}
                </div>
              </GlassmorphicCard>
            )}
          </div>

          {/* Payment Schedule */}
          <div className="lg:col-span-2">
            <GlassmorphicCard blur="sm" opacity={0.05}>
              <div className="p-6">
                <h4 className="font-semibold text-ink mb-4">Payment Schedule</h4>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray/20">
                        <th className="text-left py-2 text-gray font-medium">#</th>
                        <th className="text-left py-2 text-gray font-medium">Date</th>
                        <th className="text-right py-2 text-gray font-medium">Principal</th>
                        <th className="text-right py-2 text-gray font-medium">Interest</th>
                        <th className="text-right py-2 text-gray font-medium">Total</th>
                        <th className="text-right py-2 text-gray font-medium">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculation.payment_schedule.slice(0, 12).map((payment) => (
                        <tr key={payment.payment_number} className="border-b border-gray/10">
                          <td className="py-2 text-ink">{payment.payment_number}</td>
                          <td className="py-2 text-ink">
                            {new Date(payment.payment_date).toLocaleDateString()}
                          </td>
                          <td className="py-2 text-right text-ink">
                            ${payment.principal_payment.toFixed(2)}
                          </td>
                          <td className="py-2 text-right text-gray">
                            ${payment.interest_payment.toFixed(2)}
                          </td>
                          <td className="py-2 text-right font-medium text-accent">
                            ${payment.total_payment.toFixed(2)}
                          </td>
                          <td className="py-2 text-right text-ink">
                            ${payment.remaining_balance.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {calculation.payment_schedule.length > 12 && (
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray">
                        Showing first 12 of {calculation.payment_schedule.length} payments
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </GlassmorphicCard>
          </div>
        </div>
      )}
    </div>
  )
}
