<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\PostRequest;


class PostController extends Controller
{
/**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function index()
    {
       if (Gate::allows('isAdmin')) 
       {
            $posts = Post::latest()->paginate(3);
            return Inertia::render('Posts/Index')
                ->with('posts' , $posts);
       }
    }




    

    public function search()
    {
        // $posts = Post::all();
        $posts = Post::latest()->paginate(3);
        // return Inertia::render('Posts/SearchPaginatedPage')
        return Inertia::render('Posts/SearchIndex')
               ->with('posts' , $posts);
    }

    public function pagination()
    {
       $posts = Post::latest()->paginate(10);
       return Inertia::render('Posts/SearchPagination')
               ->with('posts' , $posts);
    }

    public function sort()
    {
       $posts = Post::latest()->paginate(10);
       return Inertia::render('Posts/SearchPaginatedBoot')
               ->with('posts' , $posts);
    }
    
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function show($id)
    {
        $post = Post::findOrFail($id);
        $this->authorize('view', $post);
        return Inertia::render('Posts/Show')
                ->with('post' , $post);
        
        // if (Gate::allows('isAdmin','isManager')) 
        // {
        //     $post = Post::findOrFail($id);
        //     return Inertia::render('Posts/Show')
        //             ->with('post' , $post);
        // }else{
        //     abort(403);
        // }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    
    public function store(PostRequest $request)
    {
        $posted_at=  $request->validated('posted_date') . " ". $request->validated('posted_time');

        Post::create([
            'language'      => $request->validated('language'),
            'title'         => $request->validated('title'),
            'body'          => $request->validated('body'),
            'is_display'    => $request->validated('is_display'),
            'is_approved'   => $request->validated('is_approved'),
            'posted_at'     => date('Y-m-d H:i:s', strtotime($posted_at)),
        ]);
        
        return redirect()->route('posts.index');
        // return redirect()->route('shop.index')->with("message",__("Shop created"));
    }
  
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
       
        $response = Gate::inspect('edit-settings');
        
        if ($response->allowed()) 
        {
            $post = Post::findOrFail($id);
            $this->authorize('view', $post); // using Policies Class
            return Inertia::render('Posts/Edit')
                ->with('post' ,$post);
        } else 
        {
            var_dump($response->message());
        }

       
    }
    
    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function update($id, PostRequest $request)
    {
        $posted_at=  $request->validated('posted_date') . " ". $request->validated('posted_time');
    
        Post::find($id)->update([
            'language'      => $request->validated('language'),
            'title'         => $request->validated('title'),
            'body'          => $request->validated('body'),
            'is_display'    => $request->validated('is_display'),
            'is_approved'   => $request->validated('is_approved'),
            'posted_at'     => date('Y-m-d H:i:s', strtotime($posted_at)),
        ]);

        return redirect()->route('posts.index');
    }
    
   /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
    */
    public function destroy($id) //,PostRequest $request
    {
        // Gate::authorize('isAdmin');
        // Post::find($id)->delete();
        // return redirect()->route('posts.index');

        $post = Post::findOrFail($id);
        $this->authorize('delete', $post);
        $post->delete();
        return redirect()->route('posts.index');

    }
}
