'use client'
import React, { useEffect, useState } from "react"

const MnyMng = () => {
    const initValue = {
        start_amount: 120,
        percent: 87,
        step: 10,
        profit_percent: 0,
        totalUsed: 0,
        totalLoss: 0,
        total_amount: 0
    };
    const [formValue, setFormValue] = useState(initValue);
    const [calData, setCalData] = useState([]);
    const [copiedIndex, setCopiedIndex] = useState(null);

    useEffect(() => {
        handleSubmit();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const handleClear = () => {
        setFormValue(initValue);
    };

    const handleSubmit = () => {
        setCalData([]);
        let amount = parseFloat(formValue.start_amount);
        let percent = parseFloat(formValue.percent);
        let step = parseFloat(formValue.step);
        let profit_percent = parseFloat(formValue.profit_percent);
        let total_amount = parseFloat(formValue.total_amount);
        let newData = [];
        let totalLoss = 0;
        let totalUsed = 0;

        for (let i = 0;i < step;i++) {
            totalLoss += amount;
            amount = ((profit_percent + 100) * totalLoss) / percent;
            if (i == 0) {
                totalUsed += amount + parseFloat(formValue.start_amount);
            } else {
                totalUsed += amount;
            }
            if (i == 0) {
                total_amount = (total_amount - amount) - parseFloat(formValue.start_amount)
            } else {
                total_amount = (total_amount - amount)
            }
            newData.push({ step: i + 1, amount: amount, usedAmount: totalUsed, total_amount: total_amount });
        }
        setCalData(newData);
    };

    function showPositiveOrZero(number) {
        return Math.max(number, 0);
    }

    return (
        <div className="flex md:flex-row flex-col gap-3 items-stretch content-center justify-center md:h-screen bg-[#0f172a] text-slate-200 p-3">
            <div className="rounded-lg bg-[#1e293b] p-4 shadow-lg">
                <div className="flex flex-col gap-3">
                    <div className="w-full">
                        <label
                            htmlFor="start_amount"
                            className="block text-sm font-medium text-slate-300 pb-1"
                        >
                            Init Amount
                        </label>
                        <input
                            type="number"
                            name="start_amount"
                            placeholder="0"
                            className="block w-full rounded-md border-slate-700 bg-[#334155] px-3 py-2 text-white placeholder-slate-400 outline-none"
                            value={formValue.start_amount}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="percent"
                            className="block text-sm font-medium text-slate-300 pb-1"
                        >
                            Return Percent
                        </label>
                        <input
                            type="number"
                            name="percent"
                            placeholder="0"
                            className="block w-full rounded-md border-slate-700 bg-[#334155] px-3 py-2 text-white placeholder-slate-400 outline-none"
                            value={formValue.percent}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="step"
                            className="block text-sm font-medium text-slate-300 pb-1"
                        >
                            Step
                        </label>
                        <input
                            type="number"
                            name="step"
                            placeholder="0"
                            className="block w-full rounded-md border-slate-700 bg-[#334155] px-3 py-2 text-white placeholder-slate-400 outline-none"
                            value={formValue.step}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="profit_percent"
                            className="block text-sm font-medium text-slate-300 pb-1"
                        >
                            Profit Percent
                        </label>
                        <input
                            type="number"
                            name="profit_percent"
                            placeholder="0"
                            className="block w-full rounded-md border-slate-700 bg-[#334155] px-3 py-2 text-white placeholder-slate-400 outline-none"
                            value={formValue.profit_percent}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="total_amount"
                            className="block text-sm font-medium text-slate-300 pb-1"
                        >
                            Total Amount
                        </label>
                        <input
                            type="number"
                            name="total_amount"
                            placeholder="0"
                            className="block w-full rounded-md border-slate-700 bg-[#334155] px-3 py-2 text-white placeholder-slate-400 outline-none"
                            value={formValue.total_amount}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <button className="w-100 block bg-green-700 py-2 mt-2 px-3 rounded-lg font-medium" onClick={handleSubmit}>
                        Save
                    </button>
                    <button className="w-100 block bg-slate-500 py-2 px-3 rounded-lg font-medium" onClick={handleClear}>
                        Clear
                    </button>
                </div>
            </div>
            {calData.length > 0 &&
                <div className="overflow-y-auto rounded-lg bg-[#1e293b] shadow-lg">
                    <table className="min-w-full text-sm text-slate-300">
                        <thead className="bg-[#334155] uppercase text-nowrap">
                            <tr>
                                <th scope="col" className="p-4 w-[100px] text-start">
                                    Step
                                </th>
                                <th scope="col" className="p-4 w-[200px] text-start">
                                    next amount
                                </th>
                                <th scope="col" className="p-4 w-[200px] text-start">
                                    require amount
                                </th>
                                <th scope="col" className="p-4 w-[200px] text-start">
                                    Remaining amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-700">
                                <td className="p-4">1</td>
                                <td className="p-4 whitespace-nowrap cursor-pointer">₹ {formValue.start_amount}</td>
                                <td className="p-4">₹ {formValue.start_amount}</td>
                                <td className="p-4">{showPositiveOrZero(formValue.total_amount - formValue.start_amount)}</td>
                            </tr>
                            {calData.map((data, index) => (
                                <tr className="border-b border-slate-700" key={index}>
                                    <td className="p-4">
                                        {index + 2}
                                    </td>
                                    <td
                                        className="p-4 whitespace-nowrap cursor-pointer"
                                        title="click to copy"
                                        onClick={() => {
                                            navigator.clipboard.writeText((data.amount).toFixed(0));
                                            setCopiedIndex(index);
                                            setTimeout(() => {
                                                setCopiedIndex(null);
                                            }, 1000);
                                        }}>
                                        ₹ {(data.amount).toFixed(0)}
                                        <span className="left-10 text-green-500">
                                            {copiedIndex === index ? ' 📋copied!' : ''}
                                        </span>
                                    </td>
                                    <td className="p-4 whitespace-nowrap">
                                        ₹ {Number(data.usedAmount).toFixed(0)}
                                    </td>
                                    <td className="p-4 whitespace-nowrap">
                                        {showPositiveOrZero(data.total_amount)?.toFixed(0)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default MnyMng
