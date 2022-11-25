import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, useForm, usePage, Link } from '@inertiajs/inertia-react';
import { useState } from "react";
import Moment from 'moment';

export default function Edit(props) {
  
    const { post } = usePage().props;
    const { data, setData, put, errors } = useForm({
        title: post.title || "",
        body: post.body || "",
        language: post.language || "",
        is_display: post.is_display || "",
        is_approved: post.is_approved || "",
        posted_date: Moment(post.posted_at).format('YYYY-MM-DD') || "",
        posted_time: Moment(post.posted_at).format('hh:mm') || "",
    });
  
    function handleSubmit(e) {
        e.preventDefault();
        put(route("posts.update", post.id));
    }

    const handleChangeSelect = event => {
        setSelected(event.target.value);
        setData("language", event.target.value)
    };

    const options = [
        {value: '', text: '--Choose an option--'},
        {value: 'en', text: 'English'},
        {value: 'jp', text: 'Japanese'},
    ];

    const [radioType, setRadioType] = useState("Y");
    const [selected, setSelected] = useState(options[0].value);

  
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Post</h2>}
        >
            <Head title="Posts" />
  
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
  
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={ route("posts.index") }
                                >
                                    Back
                                </Link>
                            </div>
  
                            <form name="createForm" onSubmit={handleSubmit}>

                                <div className="flex flex-col">
                                    <label className="">Language</label>
                                    <select value={data.language} onChange={handleChangeSelect}>
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

                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Title</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Title"
                                            name="title"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                        />
                                       
                                        {errors.title && <span className="border border-red-500 p-3 text-red-600">
                                            {errors.title}
                                        </span>}
                                        
                                    </div>
                                    <div className="mb-0">
                                        <label className="">Body</label>
                                        <textarea
                                            type="text"
                                            className="w-full rounded"
                                            label="body"
                                            name="body"
                                            errors={errors.body}
                                            value={data.body}
                                            onChange={(e) =>
                                                setData("body", e.target.value)
                                            }
                                        />
                                        
                                        {errors.body && <span className="border border-red-500 p-3 text-red-600">
                                            {errors.body}
                                        </span>}

                                    </div>

                                    <div className="mb-0">
                                        <h1>Choose Display Option</h1>
                                        <div className="radio-btn-container">
                                                <div className="radio-btn"
                                                    onClick={() => {
                                                        setRadioType("Y");
                                                    }}
                                                >
                                                <input
                                                    type="radio"
                                                    value="Y"
                                                    checked={data.is_display == "Y"}
                                                    onChange={(e) =>
                                                        setData("is_display", e.target.value)
                                                    }
                                                />
                                                 Yes
                                                </div>
                                                <div className="radio-btn"
                                                    onClick={() => {
                                                        setRadioType("N");
                                                    }}
                                                >
                                                <input
                                                    type="radio"
                                                    value="N"
                                                    checked={data.is_display == "N"}
                                                    onChange={(e) =>
                                                        setData("is_display", e.target.value)
                                                    }
                                                />
                                                 No 
                                                </div>
                                        </div>

                                        {errors.is_display && <span className="border border-red-500 p-3 text-red-600">
                                            {errors.is_display}
                                        </span>}

                                    </div>

                                    <div className="mb-0">
                                        <label>
                                            <input
                                            type="checkbox"
                                            value= "Y"
                                            defaultChecked={data.is_approved =="Y"?"Y":""}
                                            onChange={(e) =>
                                                setData("is_approved", e.target.value)
                                            }
                                            /> I Agree with this content...
                                        </label>
                                        
                                        {errors.is_approved && <span className="border border-red-500 p-3 text-red-600">
                                            {errors.is_approved}
                                        </span>}

                                    </div>

                                    <div className="flex flex-col">
                                        <label className="">Posted At </label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2"
                                            label="posted_date"
                                            name="posted_date"
                                            value={data.posted_date}
                                            onChange={(e) =>
                                                setData("posted_date", e.target.value)
                                            }
                                        />
                                    
                                        {errors.posted_date && <span className="border border-red-500 p-3 text-red-600">
                                            {errors.posted_date}
                                        </span>}

                                        <input   
                                            type="time"
                                            className=" px-4 py-2"
                                            label="posted_time"
                                            name="posted_time"
                                            value={data.posted_time}
                                            onChange={(e) =>
                                                setData("posted_time", e.target.value)
                                            }

                                        />
                                    
                                        {errors.posted_time && <span className="border border-red-500 p-3 text-red-600">
                                            {errors.posted_time}
                                        </span>}

                                    </div>

                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Update
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