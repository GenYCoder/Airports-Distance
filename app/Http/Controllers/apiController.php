<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Airports;
use Input;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class apiController extends Controller
{

	/**
	 * Gets a list of Airports
	 * @return array             A list of airport from user search term
	 */
	public function index(Airports $airports)
	{
		if(Input::has('query') && Input::get('query') !== null)
		{
			$searchTerm = Input::get('query');
			
			return $airports::where('ap_name','like','%' . $searchTerm . '%')
					->take(10)
					->get();
			
		}
	}

}
