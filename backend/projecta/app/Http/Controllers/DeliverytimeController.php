<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Deliverytime;

class DeliverytimeController extends Controller
{
    public function create(Request $request)
    {
        $time = new Deliverytime;
        $span = $request->span;
        if(preg_match("/^[0-9]?[0-9]-[0-9]?[0-9]$/", $span)){
        	
	        $times = explode("-", $span);
	        $start = (int)$times[0];
	        $end = (int)$times[1];

	        if ($start <=23  && $end <=23 && $start < $end) {
	        	$time->span = $span;
	        	$time->save();
	        }
	        else
	        {
	        	return "error";
	        }
	        
    	}
    	else
	    {
			return "error";
	    }
    }
}
