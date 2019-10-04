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

void write(){
    std::string input = "hello world";
   // std::cin >> input;
    std::ofstream out("output.txt");
    out << input;
    out.close();
}

int main()
{

    write();
    // ifstream myReadFile;
    // myReadFile.open("test.txt");
    // string s = slurp(myReadFile);
    // cout<<s;
}


