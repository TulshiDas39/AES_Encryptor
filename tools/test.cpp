#include <bits/stdc++.h> 
using namespace std; 
  
void removeDupWord(string str) 
{ 
    // Used to split string around spaces. 
    istringstream ss(str); 
  
    // Traverse through all words 
    do { 
        // Read a word 
        string word; 
        ss >> word; 
  
        // Print the read word 
        cout << word << endl; 
  
        // While there is more to read 
    } while (ss); 
} 
  
// Driver function 
int main() 
{ 
    string str = "B6 4B 27 BB 16 15 A6 F5 32 18 6C C5 FA 94 B5 5E 5C 54 EA 1B DF 97 1E 3D E3 1B FC 02 75 22 76 52 D5 7B D5 42 BA 0F 68 50 CD FD 59 B8 EB 0E 83 D1"; 
    removeDupWord(str); 
    return 0; 
} 