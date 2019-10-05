#include <iostream>
#include <fstream>
#include <sstream>

using namespace std;

std::string slurp(std::ifstream &in)
{
    std::ifstream ifs("test.txt");
    std::string content((std::istreambuf_iterator<char>(ifs)),
                        (std::istreambuf_iterator<char>()));
    return content;    
}

void write()
{
    std::string input = "hello world";
    // std::cin >> input;
    std::ofstream out("output.txt");
    out << input;
    out.close();
}

string removeSpaces(string str){
    long size = str.length();
    cout<<"22rd character"<<endl;
    cout<<str[22]<<endl;
    string actualStr = "";
    for (long i = 2; i < size; i+=2)
    {
        actualStr.push_back(str.at(i));
    }

    return actualStr;
    
}

int main()
{

    //write();
    ifstream myReadFile;
    myReadFile.open("test.txt");
    string s = slurp(myReadFile);
    string actualStr = removeSpaces(s);

    cout << actualStr;
}
