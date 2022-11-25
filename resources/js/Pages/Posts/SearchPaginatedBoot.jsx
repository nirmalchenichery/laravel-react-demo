import React, { useState ,useEffect} from "react";
import Authenticated from '@/Layouts/Authenticated';
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage, Link, useForm } from '@inertiajs/inertia-react';

// import React, { useState} from "react";
// import Authenticated from '@/Layouts/Authenticated';
// import { Inertia } from "@inertiajs/inertia";
// import { Head, usePage, Link } from '@inertiajs/inertia-react';
import PostListItem from '@/Components/PostListItem';
import Pagination from '@/Components/Pagination';


export default function SearchPaginatedBoot(props) {
    const { posts } = usePage().props
  
    // const [searchinput,SetInput] = useState("");
    const [postFromDb, setPostFromDb] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [order,setOrder] = useState("ASC");
    
    const sorting = async (col)=>{

        if(order ==="ASC"){
            const sorted =[...postFromDb].sort((a,b)=>
                a[col] > b[col] ? 1 : -1
            );
            setPostFromDb(sorted);
            setOrder("DSC")
        }
        if(order ==="DSC"){
            const sorted =[...postFromDb].sort((a,b)=>
                a[col] < b[col] ? 1 : -1
            );
            setPostFromDb(sorted);
            setOrder("ASC")
        }
    };


    const fetchPost = async () =>{
        fetch('http://127.0.0.1:8000/api/posts')
              .then((response) => {
                if (!response.ok) 
                {
                  throw new Error(
                    `This is an HTTP error: The status is ${response.status}`
                  );
                }
                return response.json();
              })
              .then((actualData) => {
                setPostFromDb(actualData.post);
                setError(null);
              })
              .catch((err) => {
                setError(err.message);
                setPostFromDb(null);
              })
              .finally(() => {
                setLoading(false);
              });
    }

    useEffect(() => {
        fetchPost();
    }, []);

     // var post_list = [];
    // if(postFromDb){
        
    //     post_list = postFromDb.map( (post, index) => { 
    //         return <PostListItem key={index} post={post}/>
    //     });
    // }
    
    function destroy(e) {
        if (confirm("Are you sure you want to delete this user?")) {
            Inertia.delete(route("posts.destroy", e.currentTarget.id));
        }
    }
      
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Sort</h2>}
        >
            <Head title="Posts" />
  
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
  
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                    href={ route("posts.create") }
                                >
                                    Create Post
                                </Link>

                            </div>
                            <button
                                className="px-4 py-2 text-purple-100 bg-purple-600 rounded-md"
                                type="button"
                                // /onClick={handleClick}
                                onClick={()=>sorting('language')}
                            >
                                Sort
                            </button>

                            <div className="container">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th  onClick={()=>sorting('id')} className="px-4 py-2 w-20">Id</th>
                                            <th  onClick={()=>sorting('language')} className="px-4 py-2">Language</th>
                                            <th  onClick={()=>sorting('title')} className="px-4 py-2">Title</th>
                                            <th  onClick={()=>sorting('body')} className="px-4 py-2">Body</th>
                                            <th  onClick={()=>sorting('is_display')} className="px-4 py-2">Display</th>
                                            <th  onClick={()=>sorting('is_approved')} className="px-4 py-2">Approved</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            postFromDb.map(post => 
                                                <tr key={post.id}>
                                                    <td className="border px-4 py-2">{post.id}</td>
                                                    <td className="border px-4 py-2">{(post.language =="en")?"English":"Japanese" }</td>
                                                    <td className="border px-4 py-2">{post.title}</td>
                                                    <td className="border px-4 py-2">{post.body}</td>
                                                    <td className="border px-4 py-2">{ (post.is_display =="Y")?"Yes":"No" }</td>
                                                    <td className="border px-4 py-2">{ (post.is_approved =="Y")?"Yes":"No"}</td>
                                                </tr>
                                            )
                                        }
                                    
                                    </tbody>
                                </table>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}