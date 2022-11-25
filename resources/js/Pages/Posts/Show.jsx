import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, useForm, usePage, Link } from '@inertiajs/inertia-react';
import { useState } from "react";
import Moment from 'moment';
// import axios, { Axios } from 'axios';
import PostListItem from '@/Components/PostListItem';
import PostShowItem from '@/Components/PostShowItem';

export default function Show(props) {
  
    const { post } = usePage().props;
    const { data, setData, put, errors } = useForm({
        id: post.id || "",
        title: post.title || "",
        body: post.body || "",
        language: post.language || "",
        is_display: post.is_display || "",
        is_approved: post.is_approved || "",
        posted_at: post.posted_at || "",
        posted_date: Moment(post.posted_at).format('YYYY-MM-DD') || "",
        posted_time: Moment(post.posted_at).format('hh:mm') || "",
    });
  
    return (

        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Show Post</h2>}
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
  
                            <PostShowItem post={data}/>

                        </div>
                    </div>
                </div>
            </div>

        </Authenticated>
    );


    
}