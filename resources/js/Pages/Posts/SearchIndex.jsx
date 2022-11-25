import React, { useState ,useEffect} from "react";
import Authenticated from '@/Layouts/Authenticated';
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage, Link, useForm } from '@inertiajs/inertia-react';
import PostListItem from '@/Components/PostListItem';
import { data } from "autoprefixer";
import { toLower } from "lodash";
import Pagination from '@/Components/Pagination';
  
export default function SearchIndex(props) {
    const { posts } = usePage().props
  
    const [searchinput,SetInput] = useState("");
    const [postFromDb, setPostFromDb] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const [pageLink,SetPageLink] = useState("");




    async function fetchPost(){
        const response = await axios.get('http://127.0.0.1:8000/api/posts/');

        // console.log(response);


        setPostFromDb(response.data.post.data);
        SetPageLink(response.data.post.links);


        // console.log(postFromDb.data);

        // console.log(postFromDb.links);


        // console.log(response.data.post.links);

        // if (response.data.status === 200){
        //     setComments(response.data.comments);
        // }
    }



    useEffect(() => {
        fetchPost();
    }, []);

   
    if(postFromDb){
        //console.log(postFromDb.data);
        //console.log(postFromDb.data.post);

       
        // console.log(postFromDb.data);
        console.log(postFromDb.links)
        
        //console.log(postFromDb.data.post.data);
        //console.log(postFromDb.data.post.link);
    }
   

    

    var post_list = [];
    if(postFromDb){
        post_list = postFromDb.map( (post, index) => {
            return <PostListItem key={index} post={post}/>
        })
    }
    
    function destroy(e) {
        if (confirm("Are you sure you want to delete this user?")) {
            Inertia.delete(route("posts.destroy", e.currentTarget.id));
        }
    }
      

   


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Search Posts</h2>}
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
  
                            <div className="flex items-center justify-between mb-6">
                                {/* Title */}
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
                                       <Pagination class="mt-6" links={pageLink} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}