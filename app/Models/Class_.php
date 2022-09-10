<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Class_ extends Model
{
    use HasFactory;
    protected $table = "classes";
    protected $factory=ClassFactory::class;
    protected $fillable = ["name","user_id"];

    public function records(){
        /* Returns the class records attached to this class */
        return $this->hasMany(ClassRecord::class,"class_id");
    }

    public function count(){
        /* Returns the count of records */
        return $this->records()->count();
    }

    public function lastDate(){
        /* Returns the last date in the records */
        if ($this->records()->get("date")->first()!=null){
            return $this->records()->orderBy("date","desc")->get("date")->first()->date;
        }else{
            return "None";
        }
    }

    public function classCount(){
        $lastReset = $this->last_reset_on;
        if ($lastReset==null){
            return null;
        }
        $recordsCount = $this->records()->where("date",">",$lastReset)->get("date")->count();
        return $recordsCount;
    }
}
