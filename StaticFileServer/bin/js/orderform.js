function display(message)

 	{

	window.status = message;

	setTimeout("clear()",14000);

	}

function clear()

 	{

	window.status="";

	}
	
function valid_number(value)

 	{

	if (value == "")

        {

	        alert("This is not a valid number.");

	        return false;

	}

	for (var i = 0; i < value.length; i++)

 	{

	if (value.charAt(i) < "0" || value.charAt(i) > "9")

        {

        alert("This is not a valid number.");

        return false;

	}

	}

	return true;

	}

function round(number)

	{

	if (number == 0)

        return "0.00";

	var result=""+Math.round(number * 100.0);

	var length=result.length;

	return(result.substring(0,length-2)+"."+result.substring(length-2,length));

	}

function calculate(form)

 	{

	form.cafe_total.value = round(34.00 * form.cafe.value);
	form.antistress_total.value = round(36.00 * form.antistress.value);
	form.catsclaw_total.value = round(34.00 * form.catsclaw.value);
	form.complete_total.value = round(34.00 * form.complete.value);
	form.detox_total.value = round(29.00 * form.detox.value);
	form.dinobites_total.value = round(34.00 * form.dinobites.value);
	form.azul_total.value = round(30.50 * form.azul.value);
	form.elite2_total.value = round(36.00 * form.elite2.value);
	form.nite_total.value = round(34.00 * form.nite.value);
	form.shake_total.value = round(31.50 * form.shake.value);
	form.emerald_total.value = round(34.00 * form.emerald.value);
	form.gold_total.value = round(34.00 * form.gold.value);
	form.di_total.value = round(36.00 * form.di.value);
	form.jubilee_total.value = round(34.00 * form.jubilee.value);
	form.slimtea_total.value = round(34.00 * form.slimtea.value);
	form.hgh_total.value = round(52.00 * form.hgh.value);
	form.silver_total.value = round(34.00 * form.silver.value);
	form.beauty_total.value = round(36.00 * form.beauty.value);
	form.memory_total.value = round(34.00 * form.memory.value);
	form.mobility_total.value = round(36.00 * form.mobility.value);
	form.olakinononi_total.value = round(34.00 * form.olakinononi.value);
	form.omega3_total.value = round(25.00 * form.omega3.value);
	form.osteoguard_total.value = round(26.00 * form.osteoguard.value);
	form.platinum_total.value = round(35.00 * form.platinum.value);
	form.prosta_total.value = round(34.00 * form.prosta.value);
	form.rejuvenate_total.value = round(34.00 * form.rejuvenate.value);
	form.steel_total.value = round(37.50 * form.steel.value);
	form.shark_total.value = round(34.00 * form.shark.value);
	form.svelte_total.value = round(36.00 * form.svelte.value);
	form.aloe_total.value = round(34.00 * form.aloe.value);

	subtotal = eval(form.cafe_total.value) + eval(form.antistress_total.value) + eval(form.catsclaw_total.value) + eval(form.complete_total.value) + eval(form.detox_total.value) + eval(form.dinobites_total.value) + eval(form.azul_total.value) + eval(form.elite2_total.value) + eval(form.nite_total.value) + eval(form.shake_total.value) + eval(form.emerald_total.value) + eval(form.gold_total.value) + eval(form.di_total.value) + eval(form.jubilee_total.value) + eval(form.slimtea_total.value) + eval(form.hgh_total.value) + eval(form.silver_total.value) + eval(form.beauty_total.value) + eval(form.memory_total.value) + eval(form.mobility_total.value) + eval(form.olakinononi_total.value) + eval(form.omega3_total.value) + eval(form.osteoguard_total.value) + eval(form.platinum_total.value) + eval(form.prosta_total.value) + eval(form.rejuvenate_total.value) + eval(form.steel_total.value) + eval(form.shark_total.value) + eval(form.svelte_total.value) + eval(form.aloe_total.value);		 				 				
	dry = eval(form.cafe.value) + eval(form.antistress.value) + eval(form.catsclaw.value) + eval(form.complete.value) + eval(form.detox.value) + eval(form.dinobites.value) + eval(form.azul.value) + eval(form.elite2.value) + eval(form.nite.value) + eval(form.emerald.value) + eval(form.gold.value) + eval(form.di.value) + eval(form.jubilee.value) + eval(form.slimtea.value) + eval(form.hgh.value) + eval(form.silver.value) + eval(form.beauty.value) + eval(form.memory.value) + eval(form.mobility.value) + eval(form.olakinononi.value) + eval(form.omega3.value) + eval(form.osteoguard.value) + eval(form.platinum.value) + eval(form.prosta.value) + eval(form.rejuvenate.value) + eval(form.steel.value) + eval(form.shark.value) + eval(form.svelte.value);
	liquid = eval(form.aloe.value) + eval(form.shake.value);

dry_total = round(dry);

if (form.ShipType.value == "Regular"){
	if(liquid < 1){
		{liquid_shipping = 0.00;}
		{liquid_total = 0;}
		if (dry_total < 1){
			{dry_shipping = 0.00;}
			
		}else{
			if (dry_total < 5)
				{dry_shipping = 8.00;}
			else{
				if (dry_total < 9)
				{dry_shipping = 11.00;}
				else{
					if (dry_total < 13)
					{dry_shipping = 13.00;}
					else	{
						{dry_shipping = 13.00;}
						}
					}
				}
			}
	}else{
		{dry_shipping = 0.00;}
		{liquid_total = round(liquid + dry);}
		if(liquid_total < 4){
			{liquid_shipping = 9.00;}
		}else{
			if(liquid_total < 8){
				{liquid_shipping = 11.00;}
			}else{
				if(liquid_total < 13){
					{liquid_shipping = 15.00;}
				}else{
					if(liquid_total < 19){
						{liquid_shipping = 19.00;}
					}else{
						{liquid_shipping = 23.00;}
					}
				}
			}
		}
	}
}else{

	if (form.ShipType.value == "3rdday"){
		if(liquid < 1){
			{liquid_shipping = 0.00;}
			{liquid_total = 0;}
			if(dry_total > 0){
				{dry_shipping = 25.00;}
			}else{
				{dry_shipping = 0.00;}
			}
		}else{
			{dry_shipping = 0.00;}
			{liquid_total = round(liquid + dry);}
			if(liquid_total < 4){
				{liquid_shipping = 24.00;}
			}else{
				if(liquid_total < 8){
					{liquid_shipping = 35.00;}
				}else{
					if(liquid_total < 13){
						{liquid_shipping = 44.00;}
					}else{
						if(liquid_total < 19){
							{liquid_shipping = 53.00;}
						}else{
							{liquid_shipping = 61.00;}
						}
					}
				}
			}
		}
			
	}else{
		if(form.ShipType.value == "2ndday"){
			if(liquid < 1){
				{liquid_shipping = 0.00;}
				{liquid_total = 0;}
				if(dry_total > 0){
					{dry_shipping = 35.00;}
				}else{
					{dry_shipping = 0.00;}
				}
			}else{
				{dry_shipping = 0.00;}
				{liquid_total = round(liquid + dry);}
				if(liquid_total < 4){
					{liquid_shipping = 32.00;}
				}else{
					if(liquid_total < 8){
						{liquid_shipping = 48.00;}
					}else{
						if(liquid_total < 13){
							{liquid_shipping = 64.00;}
						}else{
							if(liquid_total < 19){
								{liquid_shipping = 80.00;}
							}else{
								{liquid_shipping = 96.00;}
							}
						}
					}
				}
			}
		}else{
			if(liquid < 1){
				{liquid_shipping = 0.00;}
				{liquid_total = 0;}
					if(dry_total > 0 && dry_total < 4){
						{dry_shipping = 45.00;}
					}else{
						if(dry_total > 3)
							{dry_shipping = 57.00;}
						else{
							{dry_shipping = 0.00;}
						}
					}
			}else{
				{dry_shipping = 0.00;}
				{liquid_total = round(liquid + dry);}
				if(liquid_total < 4){
					{liquid_shipping = 50.00;}
				}else{
					if(liquid_total < 8){
						{liquid_shipping = 73.00;}
					}else{
						if(liquid_total < 13){
							{liquid_shipping = 86.00;}
						}else{
							if(liquid_total < 19){
								{liquid_shipping = 99.00;}
							}else{
								{liquid_shipping = 112.00;}
							}
						}
					}
				}
			}
		}
	}
}
	


	ptotal = (liquid + dry);
	form.ptotal.value = ptotal;
	shipping = (liquid_shipping + dry_shipping);	
	form.subtotal.value = round(subtotal);
	form.shipping.value = round(shipping);
	total = eval(form.subtotal.value) + eval(form.shipping.value);
	form.total.value = round(total);
	}