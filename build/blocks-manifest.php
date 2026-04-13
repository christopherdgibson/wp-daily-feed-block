<?php
// This file is generated. Do not modify it manually.
return array(
	'daily-api-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/daily-api-block',
		'version' => '0.1.0',
		'title' => 'Daily Api Block',
		'category' => 'widgets',
		'icon' => 'calendar',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'attributes' => array(
			'calendarBgColor' => array(
				'type' => 'string',
				'default' => '#262829'
			),
			'calendarFontColor' => array(
				'type' => 'string',
				'default' => '#fff'
			),
			'meetingsBgColor' => array(
				'type' => 'string',
				'default' => '#82c1f2'
			),
			'meetingsFontColor' => array(
				'type' => 'string',
				'default' => '#0d3ca1'
			),
			'meetingsDividerColorLeft' => array(
				'type' => 'string',
				'default' => '#0000FF'
			),
			'meetingsDividerColorRight' => array(
				'type' => 'string',
				'default' => '#FFA500'
			)
		),
		'supports' => array(
			'align' => array(
				'wide',
				'full'
			),
			'color' => array(
				'text' => true
			),
			'html' => false
		),
		'textdomain' => 'daily-api-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => array(
			'file:./dailyApi.css',
			'file:./calendar.css'
		),
		'style' => array(
			'file:./dailyApi.css',
			'file:./calendar.css'
		),
		'viewScript' => 'file:./view.js'
	)
);
