function distanceSqr(a, b)
{
    return ((a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y));
}

function distance(a, b)
{
    return Math.sqrt(distanceSqr(a, b));
}

