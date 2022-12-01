// import React from 'react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/inertia-react';
import React, { useState } from "react";

export default function Create(props) {
  
    const { data, setData, errors, post } = useForm({
        name:"",
        email: "",
        role: "",
        password:"",
    });
  
    const options = [
        {value: '', text: '--Choose an option--'},
        {value: 'admin', text: 'admin'},
        {value: 'manager', text: 'manager'},
        {value: 'user', text: 'user'},
    ];

    const [selected, setSelected] = useState(options[0].value);

    const handleChangeSelect = event => {
        setSelected(event.target.value);
        setData("language", event.target.value)
    };

    function handleSubmit(e) {
        e.preventDefault();
        post(route("users.store"));
    }
  
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create User</h2>}
        >
            <Head title="Users" />
  
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
  
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={ route('users.index') }
                                >
                                    Back
                                </Link>
                            </div>
  
                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <label className="font-bold">Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2"
                                        label="Name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    {errors.name && <span className="border border-red-500 p-3 text-red-600">
                                        {errors.name}
                                    </span>}
                                </div>

                                <div className="flex flex-col">
                                    <label className="font-bold">Email</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2"
                                        label="Email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    {errors.email && <span className="border border-red-500 p-3 text-red-600">
                                        {errors.email}
                                    </span>}
                                </div>

                                <div className="flex flex-col">
                                    <label className="font-bold">Password</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2"
                                        label="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    {errors.password && <span className="border border-red-500 p-3 text-red-600">
                                        {errors.password}
                                    </span>}
                                </div>


                                <div className="flex flex-col">
                                    <label className="font-bold">Role</label>
                                    <select value={selected} onChange={handleChangeSelect}>
                                        {options.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.text}
                                            </option>
                                        ))}
                                    </select>
                                   
                                    {errors.language && <span className="border border-red-500 p-3 text-red-600">
                                        {errors.language}
                                    </span>}

                                </div>
                                
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
  
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}