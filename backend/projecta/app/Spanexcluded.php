<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Spanexcluded extends Model
{
    protected $fillable = ['city_id', 'span_id', 'date'];
}
