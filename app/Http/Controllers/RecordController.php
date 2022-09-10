<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\ClassRecord;
use App\Models\Class_;

use Debugbar;
use Illuminate\Support\Facades\Auth;
use Laravel\Ui\Presets\React;

class RecordController extends Controller
{
    private function getQueryArr(Request $request){
        $date = $request->input("date");
        $class_id = $request->input("class_id");
        // $allowSameDate =$request->input("allowSameDate") == "on";
        // Debugbar::warning($allowSameDate);
        // Debugbar::warning();
        $user_id = Auth::user()->id;

        $queryArr =["user_id"=>$user_id,"class_id"=>$class_id,"date"=>$date];
        return $queryArr;
    }

    public function addRecord(Request $request){

        $queryArr = $this->getQueryArr($request);
        

        // if ($allowSameDate){
        //     ClassRecord::create($queryArr);
        // }

        $exists = ClassRecord::where($queryArr)->get()->count() > 0;
        if ($exists){
            return response(json_encode(["error"=>"date already exists"]));
        }

        ClassRecord::create($queryArr);


    }

    public function deleteRecord(Request $request){
        $queryArr = $this->getQueryArr($request);

        $exists = ClassRecord::where($queryArr)->get()->count() > 0;
        if (!$exists){
            return response(json_encode(["error"=>"Classrecord not found on this date"]));
        }
        ClassRecord::where($queryArr)->first()->delete();

        $class = class_::find($queryArr["class_id"]) ;
        Debugbar::warning($class);


        if ($class->last_reset_on == $queryArr["date"]){
            Debugbar::warning("yes");
            $class->last_reset_on = null;
            $class->save();
            return "yes";
        }
        return $class->last_reset_on.$queryArr["date"];


        

    }


}
