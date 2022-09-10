<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Class_;


class ClassRecord extends Model
{
    use HasFactory;
    protected $table="class_records";
    protected $fillable=["user_id","class_id","date","start_time","end_time"];
    

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function class()
    {
        return $this->belongsTo(Class_::class,"id","class_id");
    }


}
