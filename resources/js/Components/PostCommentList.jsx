import React from 'react';

const PostCommentList = (props) => {
    return (
        
        <div className= 'border rounded w-full flex flex-col'>
            <div className='text-black text-xs'>{props.comment.userid}</div>
            <div className='text-black text-xs'>{props.comment.email}</div>
            <div className='text-black text-xs'>{props.comment.comment}</div>
        </div>

    );
};
export default PostCommentList;