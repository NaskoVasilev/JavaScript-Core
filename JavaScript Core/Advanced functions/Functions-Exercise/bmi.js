function calculateBMI(name, age, weight, height) {
    let bmiValue = Math.round(weight / Math.pow(height / 100, 2));
    let status = "";
    if (bmiValue < 18.5) {
        status = 'underweight'
    }
    else if (bmiValue < 25) {
        status = 'normal'
    }
    else if (bmiValue < 30) {
        status = 'overweight'
    }
    else {
        status = 'obese'
    }

    let person = {
        name: name,
        personalInfo: {
            age: age,
            weight: weight,
            height: height
        },
        BMI: bmiValue,
        status: status
    }

    if(status==='obese'){
        person['recommendation']='admission required';
    }
    return person

}

calculateBMI('Nasko', 17, 60, 180)