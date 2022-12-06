// import React from 'react';
import React, { useState} from "react";
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage, Link } from '@inertiajs/inertia-react';
import UserListItem from '@/Components/UserListItem';
import Pagination from '@/Components/Pagination';
 
export default function Index(props) {
    const { users } = usePage().props
    const [searchinput,SetInput] = useState("");

    function destroy(e) {
        if (confirm("Are you sure you want to delete this user?")) {
            Inertia.delete(route("users.destroy", e.currentTarget.id));
        }
    }

    const user_list = users.data.map( (user, index) => {
        return <UserListItem key={index} user={user}/>
    })

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User</h2>}
        >
            <Head title="Users" />
  
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
  
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                    href={ route("users.create") }
                                >
                                    Create User
                                </Link>
                                {/* <Link
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                    href={ route("posts.search") }
                                >
                                    Search Page
                                </Link> */}
                            </div>
                            <div className="flex items-center justify-between mb-6">
                                
                                <input
                                    type="text"
                                    className="w-full px-4 py-2"
                                    placeholder="Search String ..."
                                    name="search"
                                    onChange={(e) =>
                                        SetInput(e.target.value)
                                    }
                                />
                            </div>

                            <div className="w-full table table-bordered">
                                    <div className="grid grid-cols-10">
                                        <div className="px-4 py-2 font-bold">ID</div>
                                        <div className="px-4 py-2 font-bold">Name</div>
                                        <div className="px-4 py-2 font-bold">Email</div>
                                        <div className="px-4 py-2 font-bold">Role</div>
                                        <div className="px-4 py-2 font-bold">Action</div>
                                    </div>
                                    {user_list}
                                    <Pagination class="mt-6" links={users.links} />
                                    
                            </div>


                        </div>
                    </div>
                </div>
            </div>
         
        </Authenticated>
    );
}