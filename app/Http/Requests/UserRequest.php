<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // var_dump(Gate::allows('isAdmin'));exit;

        return Gate::allows('isAdmin'); 
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name'      => ['required'],
            // 'password'  => ['required'],
            // 'email'     => ['required','email'],
            // 'role'      => ['required'],
            
        ];
    }

    public function messages()
    {
        return [
            'name.required'   => __('The Name field is required.'),
            // 'password.required'   => __('The Password field is required.'),
            // 'email.required'  => __('The Email field is required.'),
            // 'role.required'   => __('The Role field is required.'),
           
        ];
    }

}
