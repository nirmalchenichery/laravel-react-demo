<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // return true;

        return Gate::authorize('isAdmin');

        // return $this->user()?->can('update', $this->route('post')) ?? false;


    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'language'          => ['required'],
            'title'             => ['required'],
            'body'              => ['required'],
            'is_display'        => ['required'],
            'is_approved'       => ['required'],
            'posted_date'       => ['required'],
            'posted_time'       => ['required'],
        ];
    }

    public function messages()
    {
        return [
            'language.required'         => __('The language field is required.'),
            'title.required'            => __('The title field is required.'),
            'body.required'             => __('The body field is required.'),
            'is_display.required'       => __('The Choose Display Option is required.'),
            'is_approved.required'      => __('The is approved field is required.'),
            'posted_date.required'      => __('The posted date field is required.'),
            'posted_time.required'      => __('The posted time field is required.'),
        ];
    }

}
