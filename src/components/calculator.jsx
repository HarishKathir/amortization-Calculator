import React, { useState } from "react";
import "./calculator.css";
import PieChart from "./chart";

const calculator = () => {
    const [loanAmount, setLoanAmount] = useState("");
    const [loanTerm, setLoanTerm] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [display, setDisplay] = useState(null);
    const [pieTotalInterest, setPieTotalInterest] = useState("");

    const handleCalculate = () => {
        const monthlyInterestRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;
        const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
        const monthlyPayments =
            (loanAmount *
                monthlyInterestRate *
                Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
            denominator;

        let balanceAmount = loanAmount;
        let amortizationSchedule = [];

        for (let month = 1; month <= numberOfPayments; month++) {
            let monthlyInterest = balanceAmount * monthlyInterestRate;
            let monthlyPrincipal = monthlyPayments - monthlyInterest;
            balanceAmount = balanceAmount - monthlyPrincipal;

            amortizationSchedule.push({
                month,
                payment: monthlyPayments.toFixed(2),
                Principal: monthlyPrincipal.toFixed(2),
                Interest: monthlyInterest.toFixed(2),
                Balance: balanceAmount.toFixed(2),
            });
        }
        setDisplay(amortizationSchedule);
        setPieTotalInterest(
            amortizationSchedule
                .reduce((total, item) => total + parseFloat(item.Interest), 0)
                .toFixed(2)
        );
    };
    return (
        <div className="calculator-App">
            <div className="calc-input">
                <h2>Amortization Calculator</h2>
                <div className="input-field">
                    <label>Loan Amount</label>
                    <input
                        type="number"
                        placeholder="Amount"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                    />
                </div>
                <div className="input-field">
                    <label>Loan Term</label>
                    <input
                        type="number"
                        placeholder="In Years"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                    />
                </div>
                <div className="input-field">
                    <label>Interest Rate</label>
                    <input
                        type="number"
                        placeholder="Interest"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                    />
                </div>
                <button onClick={handleCalculate}>Calculate</button>
            </div>
            <div className="calc-output">
                {display !== null && (
                    <div>
                        <div className="pie">
                            <PieChart
                                pietotalInterest={pieTotalInterest}
                                loanAmount={loanAmount}
                                loanTerm={loanTerm}
                            />
                        </div>
                        <div className="table">
                            <h3>Monthly Schedule</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Month</th>
                                        <th>Interest</th>
                                        <th>Principal</th>
                                        <th>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {display.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.month}</td>
                                            <td>${item.Interest}</td>
                                            <td>${item.Principal}</td>
                                            <td>${item.Balance}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default calculator;
