import React from 'react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage, Link } from '@inertiajs/inertia-react';
import Pagination from '@/Components/Pagination';
import PostListItem from '@/Components/PostListItem';
  
export default function Dashboard(props) {
    const { posts } = usePage().props
  
    const post_list = posts.data.map( (post, index) => {
        return <PostListItem key={index} post={post}/>
    })

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Posts</h2>}
        >
            <Head title="Laravel 9 React JS Pagination Example with Vite - ItSolutionStuff.com" />
  
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
  
                            {/* <table className="table-fixed w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 w-20">No.</th>
                                        <th className="px-4 py-2">Title</th>
                                        <th className="px-4 py-2">Body</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.data.map(({ id, title, body }) => (
                                        <tr>
                                            <td className="border px-4 py-2">{ id }</td>
                                            <td className="border px-4 py-2">{ title }</td>
                                            <td className="border px-4 py-2">{ body }</td>
                                        </tr>
                                    ))}
                                    {post_list}
                                </tbody>

                            </table> */}

                            <div className="w-full">
                                    <div className="grid grid-cols-8">
                                        <div className="px-4 py-2 w-20">No.</div>
                                        <div className="px-4 py-2">Language</div>
                                        <div className="px-4 py-2">Title</div>
                                        <div className="px-4 py-2">Body</div>
                                        <div className="px-4 py-2">Display Option</div>
                                        <div className="px-4 py-2">Approved</div>
                                        <div className="px-4 py-2">Posted at</div>
                                        <div className="px-4 py-2">Action</div>
                                    </div>
                                    {post_list}
                            </div>
                            {post_list}
                            <Pagination class="mt-6" links={posts.links} />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}