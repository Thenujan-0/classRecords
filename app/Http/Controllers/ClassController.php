<?php

namespace App\Http\Controllers;

use App\Models\Class_;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use Debugbar;

class ClassController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $name = $request->input("name");
        $user_id = Auth::user()->id;
        Class_::create(["name"=>$name,"user_id"=>$user_id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // echo $id;
        $class = Class_::where("id",$id)->first();
        // echo $class;
        Debugbar::warning("Just testing");

        $records =$class->records()->orderBy("date","DESC")->get();
        if ($records->count() >0){
            $lastRecord = $records->first()->date;
        }else{
            $lastRecord=null;
        }
        // echo $records;
        return view("class",compact("class","lastRecord","records"));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $class =Class_::find($id);
        $name = $request->input("name");
        Debugbar::warning($name,"Name");

        if ($name==null){
            return json_encode("null");
        }
        $class->name = $name;
        Debugbar::warning($name);
        $class->update();
        return json_encode("success");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Class_::find($id)->delete();
        return json_encode("success");

    }


    public function getDates($id){
        $user_id = Auth::user()->id;
        Debugbar::warning($id);
        $data = Class_::where("id",$id)->get()->first()->records()->where("user_id",$user_id)->orderBy("date","DESC")->get()->pluck("date")->toJson();
        Debugbar::warning($data);
        Debugbar::warning(Class_::where("id",$id)->get()->first());
        return $data;

    }

    public function getFinalRecord($id ,Request $req){
        $targetClass = Class_::find($id);
        Debugbar::warning($targetClass->last_reset_on);
        return json_encode($targetClass->last_reset_on);
    }

    public function setFinalRecord($id ,Request $req){
        $targetClass = Class_::find($id);
        $targetClass->last_reset_on = $req->input("date");
        $targetClass->save();
        Debugbar::warning($targetClass);

    }

    public function getClassCount($id){
        $class = Class_::find($id);
        $recordsCount = $class->classCount();
        return json_encode($recordsCount);
        
    }

}
