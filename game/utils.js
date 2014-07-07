function Utils() {}

/* cosinusInterpolation
 * interpolate a value with a cosinus form
 * @param a the left value
 * @param b the right value
 * @param x a value in [0,1]
 */
Utils.cosinusInterpolation = function(a, b, x) {

    var k = (1 - Math.cos(x * Math.PI)) / 2;
    return a * (1 - k) + b * k;

}

/* cosinusInterpolation2D
 * interpolate a value with a cosinus, in a plan
 * @param a the top-left value
 * @param a the top-right value
 * @param a the bottom-left value
 * @param a the bottom-right value
 * @param x the X-coordinate, in [0,1]
 * @param y the Y-coordinate, in [0,1]
 */
Utils.cosinusInterpolation2D = function(a, b, c, d, x, y) {

    // we compute the value on the X-axis between a-b and c-d
    var y1 = Utils.cosinusInterpolation(a, b, x);
    var y2 = Utils.cosinusInterpolation(c, d, x);
    // we compute the interpolation between the two previous values, on the Y-axis
    return Utils.cosinusInterpolation(y1, y2, y);

}

/* getPoint2D
 * obtain the known points around the point M(x,y)
 * @param i The position of the point on the X-axis
 * @param j the position of the point on the Y-axis
 * @param stepX the step used on the X-axis (the distance between two known values)
 * @param stepY the step used on the Y-axis (the distance between two known values)
 * @param array the array of known values
 */
Utils.getPoint2D = function(i, j, stepX, stepY, array) {

    var a = array[Math.floor(i / stepX)][Math.floor(j / stepY)]; // the top-left point
    var b = array[Math.ceil(i / stepX)][Math.floor(j / stepY)]; // the top-right point
    var c = array[Math.floor(i / stepX)][Math.ceil(j / stepY)]; // the bottom-left point
    var d = array[Math.ceil(i / stepX)][Math.ceil(j / stepY)]; // the bottom-right point
    var x = (i / stepX) % 1; //obtain x in [0,1]
    var y = (j / stepY) % 1; // obtain y in [0,1]
    // we interpolate the value
    return Utils.cosinusInterpolation2D(a, b, c, d, x, y);
}

/* getCoherentPoint2D
 * used to obtain a coherent map. Compute the height at the point M(x,y) and sum the result for each octave with a persistance factor
 * @param x the position on the X-axis
 * @param y the position on the Y-axis
 * @param persistance a value in [0,1] used to reduce the amplitude of each octave
 * @param nbOctaves the number of octaves
 * @param stepX the step used on the X-axis (the distance between two known values)
 * @param stepY the step used on the Y-axis (the distance between two known values)
 * @param array the array of known values
 */
Utils.getCoherentPoint2D = function(x, y, persistance, nbOctaves, stepX, stepY, array) {

    var sum = 0; // used for the sum of all interpolation
    var p = 1; // p is used for the persistance modification
    var f = 1; // frequency = 1/step

    // for each octave
    for (var i = 1; i <= nbOctaves; i++) {

        sum = sum + p * Utils.getPoint2D(x * f, y * f, stepX, stepY, array);
        p = p * persistance;
        f = f * 2;

    }

    return (sum * (1 - persistance) / (1 - p));

}

/*
 * perlinNoise
 * Use the Perlin method to create a heightmap from pseudorandom values
 * @param width the width of the heightmap
 * @param length the length of the heightmap
 * @ param maxHeight the maximum value for the heightmap. The minimum is always 0
 * @param stepX the step on the X-axis between pseudorandom values (the distance between each points acquired by Math.random())
 * @param stepX the step on the y-axis between pseudorandom values (the distance between each points acquired by Math.random())
 * @param persistance a value in [0,1] used to reduce the amplitude between each octave (default : 0.5)
 * @param nbOctaves the number of octaves to compute (default : 4 or 8)
 */
Utils.perlinNoise = function(width, length, maxHeight, stepX, stepY, persistance, nbOctaves) {

    // we create an array with random values in [0,maxHeight]
    var noise = new Array(width * Math.pow(2, nbOctaves - 1) / stepX + 1);
    for (var i = 0; i < noise.length; i++) {

        noise[i] = new Array(length * Math.pow(2, nbOctaves - 1) / stepY + 1);

        for (var j = 0; j < noise[i].length; j++) {

            noise[i][j] = Math.floor(Math.random() * maxHeight + 1);

        }

    }


    // for each end of octave, we have to change the values to the start of the octave, to have a good join between the borders
    for (var n = 0; n < nbOctaves; n++) {

        var x = width * Math.pow(2, n) / stepX;
        for (var j = 0; j < noise[x].length; j++) {

            noise[x][j] = noise[0][j];

        }

    }

    // we now have our values so we compute the whole Perlin noise
    var map = new Array(width);
    for (var i = 0; i < width; i++) {

        map[i] = new Array(length);

        for (var j = 0; j < length; j++) {

            map[i][j] = Utils.getCoherentPoint2D(i, j, persistance, nbOctaves, stepX, stepY, noise);

        }

    }

    return map;

}

/*
 * coloredPerlinNoise
 * Use the Perlin method to create an array of imageData from pseudorandom values
 * @param width the width of the heightmap
 * @param length the length of the heightmap
 * @ param maxHeight the maximum value for the heightmap. The minimum is always 0
 * @param stepX the step on the X-axis between pseudorandom values (the distance between each points acquired by Math.random())
 * @param stepX the step on the y-axis between pseudorandom values (the distance between each points acquired by Math.random())
 * @param persistance a value in [0,1] used to reduce the amplitude between each octave (default : 0.5)
 * @param nbOctaves the number of octaves to compute (default : 4 or 8)
 */
Utils.imageDataPerlinNoise = function(width, length, maxHeight, stepX, stepY, persistance, nbOctaves, context) {

    // we create a normal Perlin Noise heightmap
    var map = Utils.perlinNoise(width, length, maxHeight, stepX, stepY, persistance, nbOctaves);

    // we create a imageData with all the map
    var image = context.createImageData(width, length);

    for (var i = 0; i < width; i++) {


        // and we transform each pixel in a color
        for (var j = 0; j < length; j++) {

            // we check the height and we quantify it to a chosen color
            if (map[i][j] <= 30) { // deep sea

                image.data[(width * j + i) * 4 + 0] = 60;
                image.data[(width * j + i) * 4 + 1] = 73;
                image.data[(width * j + i) * 4 + 2] = 129;
                image.data[(width * j + i) * 4 + 3] = 255;

            } else if (map[i][j] <= 36) { // not so deep sea

                image.data[(width * j + i) * 4 + 0] = 120;
                image.data[(width * j + i) * 4 + 1] = 120;
                image.data[(width * j + i) * 4 + 2] = 255;
                image.data[(width * j + i) * 4 + 3] = 255;

            } else if (map[i][j] <= 39) { // not deep at all sea

                image.data[(width * j + i) * 4 + 0] = 89;
                image.data[(width * j + i) * 4 + 1] = 186;
                image.data[(width * j + i) * 4 + 2] = 163;
                image.data[(width * j + i) * 4 + 3] = 255;

            } else if (map[i][j] <= 40.5) { // golden sand

                image.data[(width * j + i) * 4 + 0] = 234;
                image.data[(width * j + i) * 4 + 1] = 206;
                image.data[(width * j + i) * 4 + 2] = 106;
                image.data[(width * j + i) * 4 + 3] = 255;

            } else if (map[i][j] <= 45) { // foothill

                image.data[(width * j + i) * 4 + 0] = 1;
                image.data[(width * j + i) * 4 + 1] = 142;
                image.data[(width * j + i) * 4 + 2] = 14;
                image.data[(width * j + i) * 4 + 3] = 255;

            } else if (map[i][j] <= 55) { // hill

                image.data[(width * j + i) * 4 + 0] = 0;
                image.data[(width * j + i) * 4 + 1] = 123;
                image.data[(width * j + i) * 4 + 2] = 12;
                image.data[(width * j + i) * 4 + 3] = 255;

            } else if (map[i][j] <= 62) { // river bank

                image.data[(width * j + i) * 4 + 0] = 0;
                image.data[(width * j + i) * 4 + 1] = 104;
                image.data[(width * j + i) * 4 + 2] = 10;
                image.data[(width * j + i) * 4 + 3] = 255;

            } else if (map[i][j] <= 65) { // olive

                image.data[(width * j + i) * 4 + 0] = 109;
                image.data[(width * j + i) * 4 + 1] = 116;
                image.data[(width * j + i) * 4 + 2] = 67;
                image.data[(width * j + i) * 4 + 3] = 255;

            } else if (map[i][j] <= 70) { // vintage january

                image.data[(width * j + i) * 4 + 0] = 161;
                image.data[(width * j + i) * 4 + 1] = 162;
                image.data[(width * j + i) * 4 + 2] = 149;
                image.data[(width * j + i) * 4 + 3] = 255;

            } else { // eternal snow

                image.data[(width * j + i) * 4 + 0] = 255;
                image.data[(width * j + i) * 4 + 1] = 255;
                image.data[(width * j + i) * 4 + 2] = 255;
                image.data[(width * j + i) * 4 + 3] = 255;

            }

        }

    }
    // we display this imagedata in the planet canvas
    context.putImageData(image, 0, 0);

}

Utils.getPlanetCurvePosition = function(x, canvasWidth, deviation) {

    return (-((x - canvasWidth / 2) * (x - canvasWidth / 2) * deviation / (canvasWidth * canvasWidth / 4)));

}

Utils.sign = function(x) {
    if (x == 0) {
        return 0;
    }
    return (x / Math.abs(x));
}