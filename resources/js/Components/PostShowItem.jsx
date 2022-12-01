import React from 'react';
import { Head, usePage, Link } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import Modal from "@/Components/ModalCustomized";
import PostCommentList from '@/Components/PostCommentList';
import axios, { Axios } from 'axios';

const PostShowItem = (props) => {

    const [showModal, setShowModal] = useState(false);

    function showComments(id) {
        // setOpenReminder(true);
        setShowModal(true);
        comment(id);
    }

    const [comments, setComments] = useState([]);

    async function comment(id){
        const response = await axios.get('/comment/' + id);
        if (response.data.status === 200){
            setComments(response.data.comments);
        }
        // const response = await axios.get('/comment',{
        //     params: {
        //         id: 1
        //     }
        // });
    }

    var comments_list = [];
    if(comments.length > 0){
        comments_list = comments.map( (comment, index) => { 
            return <PostCommentList key={index} comment={comment}/>
        })
    }

    return (
       
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        
                        <div className="flex flex-col-2">
                            <strong> ID : </strong>{props.post.id}
                        </div>

                        <div className="flex flex-col-2">
                            <strong> Language : </strong> {(props.post.language =="en")?"English":"Japanese" }
                        </div>

                        <div className="flex flex-col-2">
                            <strong> Title : </strong>{props.post.title}
                        </div>

                        <div className="flex flex-col-2">
                            <strong> Body : </strong>{props.post.body}
                        </div>

                        <div className="flex flex-col-2">
                            <strong> Display Option : </strong>{ (props.post.is_display =="Y")?"Yes":"No" }
                        </div>
                         
                        <div className="flex flex-col-2">
                            <strong> Approved : </strong>{ (props.post.is_approved =="Y")?"Yes":"No" }
                        </div>

                        <div className="flex flex-col-2">
                            <strong> Posted : </strong>{ props.post.posted_at }
                        </div>

                        <div>
                            <button
                                className="px-4 py-2 text-purple-100 bg-purple-600 rounded-md"
                                type="button"
                                onClick={() => {
                                    showComments(props.post.id);
                                }}
                            >
                                Show Comments
                            </button>
                            
                            {showModal && 
                                <Modal 
                                    OpenOrShowModal={setShowModal} 
                                    title="Comments" 
                                    btnOk ="OK"
                                    btnClose="Close"
                                    content={comments_list}
                                />
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
       
       
    );
};
export default PostShowItem;
