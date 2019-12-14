<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\City;
use App\Deliverytime;
use App\Spanexcluded;

use DateTime;
use DatePeriod;
use DateInterval;

class CityController extends Controller
{
    public function create(Request $request)
    {
        $city = City::create($request->all());
    }

    public function attach(Request $request, $city_id)
    {
    	$city = City::find($city_id);
    	$times = Deliverytime::find($request->all());
		$city->deliveryTimes()->attach($times);
    }

    /*

        json format 
        {
            "0": ["3", "2019-05-1"],
            "1": ["2", "2019-05-2"],
            .
            .
            .
        }
        3 and 2 are ids of spans that we want to exclude from the city delivery times


    */
    public function exclude(Request $request, $city_id)
    {
    	$city = City::find($city_id);
        $data = $request->all();
        foreach ($data as $key => $value) {
            $span = Deliverytime::find($value[0])->id;
            $pivot = $city->deliveryTimes()->find($span)->pivot->id;
            //dd($pivot);
            if($pivot)
            {
                $excluded = new Spanexcluded;
                $excluded->city_id = $city_id;
                $excluded->span_id = $span;
                $excluded->date = $value[1];
                $excluded->save();
            }
        }
    }

    /*

        json format 
        {
            "0": "2019-05-1",
            "1": "2019-05-2",
            .
            .
            .
        }
        


    */

    public function excludeAll(Request $request, $city_id)
    {
    	$city = City::find($city_id);
        $pivots = $city->deliveryTimes()->where('city_id', $city_id)->get();
        $data = $request->all();
        foreach ($pivots as $key1 => $value1) {
            $span_id = $value1->id;
            foreach ($data as $key2 => $value2) {
                $excluded = new Spanexcluded;
                $excluded->city_id = $city_id;
                $excluded->span_id = $span_id;
                $excluded->date = $value2;
                $excluded->save();
            }
        }
		
    }

    function getDatesFromRange($start, $count, $format = 'Y-m-d') {
        $array = array();
        $interval = new DateInterval('P1D');
        $start = new DateTime($start);
        $array[] = $start->format($format);

        for ($i=0; $i < $count-1; $i++) { 
            $start = $start->add($interval);
            $array[] = $start->format($format);
        }

        return $array;
    }

    public function deliveryDatesTimes($city_id, $number_of_days_to_get)
    {
        $dates = $this->getDatesFromRange(date('Y-m-d'), $number_of_days_to_get);
        $city = City::find($city_id);
        $spans = $city->deliveryTimes()->where('city_id', $city_id)->get();

        $json = ["dates" => []];
        $day = ["delivery_times" => []];
        $delivery_times = ["id" => "", "delivery_at" => ""];

        foreach ($dates as $key => $date) {
            $day["delivery_times"] = [];
                foreach ($spans as $keySpan => $span) {
                    $span_id = $span->id;
                    $excluded = Spanexcluded::where([['city_id',$city_id],['span_id', $span_id],['date', $date]])->first();
                    if($excluded === null) $day["delivery_times"][] = ["id" => $span_id, "delivery_at" => $spans[$keySpan]->span];
                    
                }
            $json["dates"][] = ["day_name" => date("l", strtotime($date)), "date" => $date, "delivery_times" => $day["delivery_times"]];
        }
       
        return json_encode($json);
        
    }
}


    