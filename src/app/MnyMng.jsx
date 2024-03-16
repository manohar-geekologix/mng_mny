'use client'
import React, { useEffect, useState } from "react"

const MnyMng = () => {
    const initValue = {
        start_amount: 100,
        percent: 85,
        step: 10,
        profit_percent: 0
    }
    const [formValue, setFormValue] = useState(initValue)
    const [calData, setCalData] = useState([])

    useEffect(() => {
        handleSubmit()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }

    const handleClear = () => {
        setCalData([])
        setFormValue(initValue)
    }

    const handleSubmit = () => {
        setCalData([]);
        let amount = parseFloat(formValue.start_amount);
        let percent = parseFloat(formValue.percent);
        let step = parseFloat(formValue.step);
        let profit_percent = parseFloat(formValue.profit_percent);
        let newData = [];
        let totalLoss = 0;

        for (let i = 0; i < step; i++) {
            totalLoss += amount;
            amount = ((profit_percent + 100) * totalLoss) / percent;
            newData.push({ step: i + 1, amount: amount });
        }
        setCalData(newData);
    };

    return (
        <div className="container m-auto">
            <div className="bg-white border shadow-md p-4 my-3 font-mono">
                <div className="flex flex-col md:flex-row justify-between items-end gap-3">
                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="start_amount"
                            className="block text-grey-darker text-md font-bold mb-1"
                        >
                            Init amount
                        </label>
                        <input
                            type="number"
                            name="start_amount"
                            placeholder="0"
                            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none"
                            value={formValue.start_amount}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="percent"
                            className="block text-grey-darker text-md font-bold mb-1"
                        >
                            Percent
                        </label>
                        <input
                            type="number"
                            name="percent"
                            placeholder="0"
                            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none"
                            value={formValue.percent}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
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
                            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none"
                            value={formValue.step}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
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
                            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none"
                            value={formValue.profit_percent}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-sky-300 py-2 px-3 rounded-lg mb-[10px] font-medium" onClick={handleSubmit}>
                            Save
                        </button>
                        <button className="bg-gray-300 py-2 px-3 rounded-lg mb-[10px] font-medium" onClick={handleClear}>
                            Clear
                        </button>
                    </div>
                </div>
            </div>
            {
                calData.length > 0 &&
                <div className="bg-white border shadow-md p-4 my-3 mt-[35px] font-mono">
                    <h5>Result</h5>
                    <div class="flex flex-col mt-6">
                        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="shadow overflow-hidden sm:rounded-lg">
                                    <table class="min-w-full text-sm">
                                        <thead class="bg-gray-50 text-xs uppercase font-medium">
                                            <tr>
                                                <th scope="col" class="px-6 py-3 text-left tracking-wider border">
                                                    Step
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                    After loss next amount
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="border bg-sky-50">
                                            {calData.map((data, index) => (
                                                <tr className="border" key={index}>
                                                    <td class="pl-4 border">
                                                        {index + 1}
                                                    </td>
                                                    <td
                                                        className="px-6 py-4 whitespace-nowrap cursor-pointer"
                                                        onClick={() => { navigator.clipboard.writeText((data.amount).toFixed(0)) }}
                                                        title="click to copy "
                                                    >
                                                        ₹ {(data.amount).toFixed(0)}
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
