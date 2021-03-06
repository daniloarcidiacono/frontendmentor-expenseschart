import React from 'react';
import clsx from 'clsx';
import { Expense } from '../../model/Expenses';
import Tooltip from '../UI/Tooltip';
import './ExpensesChart.scss';

export interface ExpensesChartProps {
    className?: string;
    expenses: Expense[];
}

function ExpensesChart({ className, expenses }: ExpensesChartProps) {
    const maxExpenses: number = Math.max(...expenses.map(x => x.amount));
    const chartClasses = clsx("expenseschart", ...(className?.split(' ') || []));
    const barClasses = (expense: Expense) => clsx({ 
        "expenseschart__bar": true, 
        "expenseschart__bar--maximum": expense.amount === maxExpenses 
    });
    const barHeight = (expense: Expense) => expense.amount / maxExpenses * 100;

    return (
        <>
            <div className={chartClasses}>
                {
                    expenses.map(expense => (
                        <React.Fragment key={expense.day}>
                            <Tooltip title={'$' + expense.amount}>
                                <div className={barClasses(expense)} style={ { 'height': barHeight(expense) + '%' } }></div>
                            </Tooltip>
                            <div className="expenseschart__label">{expense.day}</div>
                        </React.Fragment>
                    ))
                }
            </div>
        </>
    );
}

export default ExpensesChart;