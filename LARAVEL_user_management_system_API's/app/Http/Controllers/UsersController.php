<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{

    public function __construct(){
        $this->middleware('auth:api');
    }



    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $res = [
            'data' => null,
            'message' => '',
            'success' => true
        ];

        try{
            $res['data'] = User::all();

        }catch(\Exception $e){
            $res['message'] = $e -> getMessage();
            $res['status'] = false;
        }

        return $res;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $res = [
            'data' => null,
            'message' => 'User created',
            'success' => true
        ];

        try{
            $data =  $request->except(['id']);
            $data['password'] = $data['password'] ?? 'andyandy';
            $data['password'] = \Hash::make($data['password']);
            $user = new User();
            $user->fill($data);
            $user->save();

            $res['data'] = $user;

        }catch(\Exception $e){
            $res['message'] = $e -> getMessage();
            $res['status'] = false;
        }


        return $res;


    }

    /**
     * Display the specified resource.
     */
    public function show($user)
    {
        $res = [
            'data' => null,
            'message' => '',
            'success' => true
        ];

        try{
            $res['data'] = User::findOrFail($user);



        }catch(\Exception $e){
            $res['message'] = $e -> getMessage();
            $res['status'] = false;
        }

        return $res;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $data =  $request->except(['id']);
        $res = [
            'data' => null,
            'message' => '',
            'status'=> true
        ];
        try{
            $user = User::findOrFail($id);
            $user->update($data);

            $res['data']= $user;

        }catch(\Exception $e){
            $res['message']= $e->getMessage();
            $res['status']= false;
        }

        return $res;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $res = [
            'data' => null,
            'message' => '',
            'status'=> true
        ];
        try{
            $user -> delete();
            $res['message']= "User with id -> " .$user->id. " was deleted";

        }catch(\Exception $e){
            $res['message']= $e->getMessage();
            $res['status']= false;
        }

        return $res;
    }
}
