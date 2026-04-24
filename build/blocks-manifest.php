<?php
// This file is generated. Do not modify it manually.
return array(
	'daily-feed-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/daily-feed-block',
		'version' => '0.1.0',
		'title' => 'Daily Feed Block',
		'author' => 'Christopher D Gibson',
		'authorURI' => 'https://christopherdgibson.github.io',
		'description' => 'A daily API display block with calendar navigation..',
		'category' => 'widgets',
		'icon' => 'rss',
		'license' => 'GPL-2.0-or-later',
		'licenseURI' => 'https://www.gnu.org/licenses/gpl-2.0.html',
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
				'default' => '#e3e3e3'
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
		'usesContext' => array(
			
		),
		'render' => 'file:./render.php',
		'textdomain' => 'daily-feed-block',
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
