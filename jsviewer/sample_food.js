var food = {
	"settings":{
		"idName": "id",
		"nameName": "name",
		"columns": [],
		"types":["ingredient","recipe","unit"]
	},
	"content":[
		{
			"id": "auto",
			"name":"gram",
			"type": "unit"
		},
		{
			"id": "auto",
			"name":"liter",
			"type": "unit"
		},
		{
			"id": "auto",
			"name":"gram",
			"type": "unit"
		},
		{
			"id": "auto",
			"name":"apple",
			"type": "ingredient",
		},
		{
			"id": "auto",
			"name":"flour",
			"type": "ingredient",
			"unit":"#gram",
		},
		{
			"id": "auto",
			"name": "apple pie",
			"type":"recipe",
			"for": 6,
			"needed":
				[
					{"ingredient": "#apple", "quantity": 4},
					{"ingredient": "#flour", "quantity": 150},
				]
		}
	]
};
