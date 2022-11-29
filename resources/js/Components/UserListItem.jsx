import React from 'react';
import { Head, usePage, Link } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Inertia } from "@inertiajs/inertia";


const UserListItem = (props) => {

    function destroy(e) {
        if (confirm("Are you sure you want to delete this user?")) {
            Inertia.delete(route("posts.destroy", e.currentTarget.id));
        }
    }

    return (
        <div key={props.user.id} className='grid grid-cols-8'>
            <div className="border px-4 py-2 colspan='2' ">{props.user.id}</div>
            <div className="border px-4 py-2 colspan='4' ">{props.user.name}</div>
            <div className="border px-4 py-2 colspan='2' ">{props.user.email}</div>
            <div className="border px-4 py-2 colspan='2' ">{props.user.role}</div>
            <div className="border px-4 py-3 colspan='2' ">
                <Link
                    tabIndex="1"
                    className="px-3 py-3 text-sm text-white bg-blue-500 rounded"
                    href={route("posts.show", props.user.id)}
                >
                    Show
                </Link>
                <Link
                    tabIndex="1"
                    className="px-3 py-3 text-sm text-white bg-green-500 rounded"
                    href={route("posts.edit", props.user.id)}
                >
                    Edit
                </Link>
                <button
                    onClick={destroy}
                    id={props.user.id}
                    tabIndex="-1"
                    type="button"
                    className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};
export default UserListItem;