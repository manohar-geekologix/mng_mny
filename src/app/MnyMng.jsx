'use client'
import React, { useEffect, useState } from "react"

const MnyMng = () => {
    const initValue = {
        start_amount: 100,
        percent: 85,
        step: 10,
        profit_percent: 0,
        totalUsed: 0,
        totalLoss: 0,
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
        let newData = [];
        let totalLoss = 0;
        let totalUsed = 0;

        for (let i = 0;i < step;i++) {
            totalLoss += amount;
            amount = ((profit_percent + 100) * totalLoss) / percent;
            totalUsed += totalLoss;
            newData.push({ step: i + 1, amount: amount, usedAmount: totalUsed });
        }
        setCalData(newData);
    };

    return (
        <div className="grid grid-cols-12 content-center justify-center h-screen bg-slate-800 text-slate-200">
            <div className="col-span-3"></div>
            <div className="col-span-2 p-4 my-3 font-mono pt-16 border border-slate-400 bg-cyan-950 rounded-bl-xl rounded-tl-xl">
                <div className="flex flex-col gap-3">
                    <div className="w-full">
                        <label
                            htmlFor="start_amount"
                            className="block text-grey-darker text-md font-bold mb-1"
                        >
                            Init Amount
                        </label>
                        <input
                            type="number"
                            name="start_amount"
                            placeholder="0"
                            className="shadow appearance-none border bg-transparent border-red rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none"
                            value={formValue.start_amount}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="percent"
                            className="block text-grey-darker text-md font-bold mb-1"
                        >
                           Return Percent
                        </label>
                        <input
                            type="number"
                            name="percent"
                            placeholder="0"
                            className="shadow appearance-none border bg-transparent border-red rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none"
                            value={formValue.percent}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="step"
                            className="block text-grey-darker text-md font-bold mb-1"
                        >
                            Step
                        </label>
                        <input
                            type="number"
                            name="step"
                            placeholder="0"
                            className="shadow appearance-none border bg-transparent border-red rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none"
                            value={formValue.step}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="profit_percent"
                            className="block text-grey-darker text-md font-bold mb-1"
                        >
                            Profit Percent
                        </label>
                        <input
                            type="number"
                            name="profit_percent"
                            placeholder="0"
                            className="shadow appearance-none border bg-transparent border-red rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none"
                            value={formValue.profit_percent}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className=" bg-green-700 py-2 px-3 rounded-lg font-medium" onClick={handleSubmit}>
                            Save
                        </button>
                        <button className="bg-slate-500 py-2 px-3 rounded-lg font-medium" onClick={handleClear}>
                            Clear
                        </button>
                    </div>
                </div>
            </div>
            {
                calData.length > 0 &&
                <div className="col-span-4 p-4 my-3 font-mono border border-slate-400 bg-slate-800 rounded-br-xl rounded-tr-xl">
                    <div class="flex flex-col mt-6">
                        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="shadow-lg h-[550px] overflow-auto">
                                    <table class="min-w-full text-sm">
                                        <thead class="bg-cyan-950 text-xs uppercase font-medium border border-slate-400">
                                            <tr>
                                                <th scope="col" class="px-6 py-3 text-left tracking-wider border border-slate-400">
                                                    Step
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left tracking-wider border border-slate-400">
                                                    next amount
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                    require amount
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="border border-slate-400 bg-cyan-900">
                                            {calData.map((data, index) => (
                                                <tr className="border border-slate-400" key={index}>
                                                    <td class="pl-4 border border-slate-400 w-[200px]">
                                                        {index + 1}
                                                    </td>
                                                    <td
                                                        className="px-6 py-4 whitespace-nowrap cursor-pointer w-50 border border-slate-400 w-[200px]"
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
                                                    <td className="px-6 py-4 whitespace-nowrap w-50">
                                                        ₹ {(data.usedAmount).toFixed(0)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default MnyMng
