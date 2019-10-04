#include <iostream>
#include <fstream>
#include <sstream>


using namespace std;

std::string slurp(std::ifstream &in)
{
    std::stringstream sstr;
    sstr << in.rdbuf();
    return sstr.str();
}

int main()
{

    ifstream myReadFile;
    myReadFile.open("test.txt");
    slurp(myReadFile);
}


