#include <iostream>
#include <string.h>
using namespace std;


unsigned char s_box[256] =
{
    0X63, 0X7C, 0X77, 0X7B, 0XF2, 0X6B, 0X6F, 0XC5, 0X30, 0X01, 0X67, 0X2B, 0XFE, 0XD7, 0XAB, 0X76,
    0XCA, 0X82, 0XC9, 0X7D, 0XFA, 0X59, 0X47, 0XF0, 0XAD, 0XD4, 0XA2, 0XAF, 0X9C, 0XA4, 0X72, 0XC0,
    0XB7, 0XFD, 0X93, 0X26, 0X36, 0X3F, 0XF7, 0XCC, 0X34, 0XA5, 0XE5, 0XF1, 0X71, 0XD8, 0X31, 0X15,
    0X04, 0XC7, 0X23, 0XC3, 0X18, 0X96, 0X05, 0X9A, 0X07, 0X12, 0X80, 0XE2, 0XEB, 0X27, 0XB2, 0X75,
    0X09, 0X83, 0X2C, 0X1A, 0X1B, 0X6E, 0X5A, 0XA0, 0X52, 0X3B, 0XD6, 0XB3, 0X29, 0XE3, 0X2F, 0X84,
    0X53, 0XD1, 0X00, 0XED, 0X20, 0XFC, 0XB1, 0X5B, 0X6A, 0XCB, 0XBE, 0X39, 0X4A, 0X4C, 0X58, 0XCF,
    0XD0, 0XEF, 0XAA, 0XFB, 0X43, 0X4D, 0X33, 0X85, 0X45, 0XF9, 0X02, 0X7F, 0X50, 0X3C, 0X9F, 0XA8,
    0X51, 0XA3, 0X40, 0X8F, 0X92, 0X9D, 0X38, 0XF5, 0XBC, 0XB6, 0XDA, 0X21, 0X10, 0XFF, 0XF3, 0XD2,
    0XCD, 0X0C, 0X13, 0XEC, 0X5F, 0X97, 0X44, 0X17, 0XC4, 0XA7, 0X7E, 0X3D, 0X64, 0X5D, 0X19, 0X73,
    0X60, 0X81, 0X4F, 0XDC, 0X22, 0X2A, 0X90, 0X88, 0X46, 0XEE, 0XB8, 0X14, 0XDE, 0X5E, 0X0B, 0XDB,
    0XE0, 0X32, 0X3A, 0X0A, 0X49, 0X06, 0X24, 0X5C, 0XC2, 0XD3, 0XAC, 0X62, 0X91, 0X95, 0XE4, 0X79,
    0XE7, 0XC8, 0X37, 0X6D, 0X8D, 0XD5, 0X4E, 0XA9, 0X6C, 0X56, 0XF4, 0XEA, 0X65, 0X7A, 0XAE, 0X08,
    0XBA, 0X78, 0X25, 0X2E, 0X1C, 0XA6, 0XB4, 0XC6, 0XE8, 0XDD, 0X74, 0X1F, 0X4B, 0XBD, 0X8B, 0X8A,
    0X70, 0X3E, 0XB5, 0X66, 0X48, 0X03, 0XF6, 0X0E, 0X61, 0X35, 0X57, 0XB9, 0X86, 0XC1, 0X1D, 0X9E,
    0XE1, 0XF8, 0X98, 0X11, 0X69, 0XD9, 0X8E, 0X94, 0X9B, 0X1E, 0X87, 0XE9, 0XCE, 0X55, 0X28, 0XDF,
    0X8C, 0XA1, 0X89, 0X0D, 0XBF, 0XE6, 0X42, 0X68, 0X41, 0X99, 0X2D, 0X0F, 0XB0, 0X54, 0XBB, 0X16
};

unsigned char mul2[256] =
{
    0X00,0X02,0X04,0X06,0X08,0X0A,0X0C,0X0E,0X10,0X12,0X14,0X16,0X18,0X1A,0X1C,0X1E,
    0X20,0X22,0X24,0X26,0X28,0X2A,0X2C,0X2E,0X30,0X32,0X34,0X36,0X38,0X3A,0X3C,0X3E,
    0X40,0X42,0X44,0X46,0X48,0X4A,0X4C,0X4E,0X50,0X52,0X54,0X56,0X58,0X5A,0X5C,0X5E,
    0X60,0X62,0X64,0X66,0X68,0X6A,0X6C,0X6E,0X70,0X72,0X74,0X76,0X78,0X7A,0X7C,0X7E,
    0X80,0X82,0X84,0X86,0X88,0X8A,0X8C,0X8E,0X90,0X92,0X94,0X96,0X98,0X9A,0X9C,0X9E,
    0XA0,0XA2,0XA4,0XA6,0XA8,0XAA,0XAC,0XAE,0XB0,0XB2,0XB4,0XB6,0XB8,0XBA,0XBC,0XBE,
    0XC0,0XC2,0XC4,0XC6,0XC8,0XCA,0XCC,0XCE,0XD0,0XD2,0XD4,0XD6,0XD8,0XDA,0XDC,0XDE,
    0XE0,0XE2,0XE4,0XE6,0XE8,0XEA,0XEC,0XEE,0XF0,0XF2,0XF4,0XF6,0XF8,0XFA,0XFC,0XFE,
    0X1B,0X19,0X1F,0X1D,0X13,0X11,0X17,0X15,0X0B,0X09,0X0F,0X0D,0X03,0X01,0X07,0X05,
    0X3B,0X39,0X3F,0X3D,0X33,0X31,0X37,0X35,0X2B,0X29,0X2F,0X2D,0X23,0X21,0X27,0X25,
    0X5B,0X59,0X5F,0X5D,0X53,0X51,0X57,0X55,0X4B,0X49,0X4F,0X4D,0X43,0X41,0X47,0X45,
    0X7B,0X79,0X7F,0X7D,0X73,0X71,0X77,0X75,0X6B,0X69,0X6F,0X6D,0X63,0X61,0X67,0X65,
    0X9B,0X99,0X9F,0X9D,0X93,0X91,0X97,0X95,0X8B,0X89,0X8F,0X8D,0X83,0X81,0X87,0X85,
    0XBB,0XB9,0XBF,0XBD,0XB3,0XB1,0XB7,0XB5,0XAB,0XA9,0XAF,0XAD,0XA3,0XA1,0XA7,0XA5,
    0XDB,0XD9,0XDF,0XDD,0XD3,0XD1,0XD7,0XD5,0XCB,0XC9,0XCF,0XCD,0XC3,0XC1,0XC7,0XC5,
    0XFB,0XF9,0XFF,0XFD,0XF3,0XF1,0XF7,0XF5,0XEB,0XE9,0XEF,0XED,0XE3,0XE1,0XE7,0XE5
};

unsigned char mul3[256] =
{
    0X00,0X03,0X06,0X05,0X0C,0X0F,0X0A,0X09,0X18,0X1B,0X1E,0X1D,0X14,0X17,0X12,0X11,
    0X30,0X33,0X36,0X35,0X3C,0X3F,0X3A,0X39,0X28,0X2B,0X2E,0X2D,0X24,0X27,0X22,0X21,
    0X60,0X63,0X66,0X65,0X6C,0X6F,0X6A,0X69,0X78,0X7B,0X7E,0X7D,0X74,0X77,0X72,0X71,
    0X50,0X53,0X56,0X55,0X5C,0X5F,0X5A,0X59,0X48,0X4B,0X4E,0X4D,0X44,0X47,0X42,0X41,
    0XC0,0XC3,0XC6,0XC5,0XCC,0XCF,0XCA,0XC9,0XD8,0XDB,0XDE,0XDD,0XD4,0XD7,0XD2,0XD1,
    0XF0,0XF3,0XF6,0XF5,0XFC,0XFF,0XFA,0XF9,0XE8,0XEB,0XEE,0XED,0XE4,0XE7,0XE2,0XE1,
    0XA0,0XA3,0XA6,0XA5,0XAC,0XAF,0XAA,0XA9,0XB8,0XBB,0XBE,0XBD,0XB4,0XB7,0XB2,0XB1,
    0X90,0X93,0X96,0X95,0X9C,0X9F,0X9A,0X99,0X88,0X8B,0X8E,0X8D,0X84,0X87,0X82,0X81,
    0X9B,0X98,0X9D,0X9E,0X97,0X94,0X91,0X92,0X83,0X80,0X85,0X86,0X8F,0X8C,0X89,0X8A,
    0XAB,0XA8,0XAD,0XAE,0XA7,0XA4,0XA1,0XA2,0XB3,0XB0,0XB5,0XB6,0XBF,0XBC,0XB9,0XBA,
    0XFB,0XF8,0XFD,0XFE,0XF7,0XF4,0XF1,0XF2,0XE3,0XE0,0XE5,0XE6,0XEF,0XEC,0XE9,0XEA,
    0XCB,0XC8,0XCD,0XCE,0XC7,0XC4,0XC1,0XC2,0XD3,0XD0,0XD5,0XD6,0XDF,0XDC,0XD9,0XDA,
    0X5B,0X58,0X5D,0X5E,0X57,0X54,0X51,0X52,0X43,0X40,0X45,0X46,0X4F,0X4C,0X49,0X4A,
    0X6B,0X68,0X6D,0X6E,0X67,0X64,0X61,0X62,0X73,0X70,0X75,0X76,0X7F,0X7C,0X79,0X7A,
    0X3B,0X38,0X3D,0X3E,0X37,0X34,0X31,0X32,0X23,0X20,0X25,0X26,0X2F,0X2C,0X29,0X2A,
    0X0B,0X08,0X0D,0X0E,0X07,0X04,0X01,0X02,0X13,0X10,0X15,0X16,0X1F,0X1C,0X19,0X1A
};

unsigned char rcon[256] =
{
    0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a,
    0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39,
    0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a,
    0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8,
    0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef,
    0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc,
    0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b,
    0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3,
    0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94,
    0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20,
    0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35,
    0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f,
    0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02, 0x04,
    0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63,
    0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd,
    0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d
};


void key_expansion_core(unsigned char* in, unsigned char i)
{
    unsigned int * q = (unsigned int *) in;
    // Left rotate bytes
    *q = (*q >> 8 | ((*q & 0xff) << 24));

    in[0] = s_box[in[0]];
    in[1] = s_box[in[1]];
    in[2] = s_box[in[2]];
    in[3] = s_box[in[3]];

    // RCon XOR
    in[0] ^= rcon[i];
}

void key_expansion(unsigned char* input_key, unsigned char* expanded_keys)
{
    // Set first 16 bytes to input_key
    for (int i = 0; i < 16; i++)
        expanded_keys[i] = input_key[i];

    unsigned int bytes_generated = 16;
    int rcon_iteration = 1;
    unsigned char temp[4];

    // Generate the next 160 bytes
    while (bytes_generated < 176)
    {
        // Read 4 bytes for the core
        for (int i = 0; i < 4; i++)
            temp[i] = expanded_keys[i + bytes_generated - 4];

        // Perform the core once for each 16 byte key
        if (bytes_generated % 16 == 0)
            key_expansion_core(temp, rcon_iteration++);

        // XOR temp with [bytes_generated-16], and store in expanded_keys
        for (unsigned char a = 0; a < 4; a++)
        {
            expanded_keys[bytes_generated] = expanded_keys[bytes_generated - 16] ^ temp[a];
            bytes_generated++;
        }
    }
}

void sub_bytes(unsigned char* state)
{
    // Substitute each state value with another byte in the Rijndael S-Box
    for (int i = 0; i < 16; i++)
        state[i] = s_box[state[i]];
}

void shift_rows(unsigned char* state)
{
    unsigned char tmp[16];

    // First row don't shift (idx = idx)
    tmp[0] = state[0];
    tmp[4] = state[4];
    tmp[8] = state[8];
    tmp[12] = state[12];

    // Second row shift right once (idx = (idx + 4) % 16)
    tmp[1] = state[5];
    tmp[5] = state[9];
    tmp[9] = state[13];
    tmp[13] = state[1];

    // Third row shift right twice (idx = (idx +/- 8) % 16)
    tmp[2] = state[10];
    tmp[6] = state[14];
    tmp[10] = state[2];
    tmp[14] = state[6];

    // Fourth row shift right three times (idx = (idx - 4) % 16)
    tmp[3] = state[15];
    tmp[7] = state[3];
    tmp[11] = state[7];
    tmp[15] = state[11];

    for (int i = 0; i < 16; i++)
        state[i] = tmp[i];
}

void mix_columns(unsigned char* state)
{
    // Dot product and byte mod of state

    unsigned char tmp[16];
    // Column 1 entries
    tmp[0] = (unsigned char) (mul2[state[0]] ^ mul3[state[1]] ^ state[2] ^ state[3]);
    tmp[1] = (unsigned char) (state[0] ^ mul2[state[1]] ^ mul3[state[2]] ^ state[3]);
    tmp[2] = (unsigned char) (state[0] ^ state[1] ^ mul2[state[2]] ^ mul3[state[3]]);
    tmp[3] = (unsigned char) (mul3[state[0]] ^ state[1] ^ state[2] ^ mul2[state[3]]);

    // Column 2 entries
    tmp[4] = (unsigned char) (mul2[state[4]] ^ mul3[state[5]] ^ state[6] ^ state[7]);
    tmp[5] = (unsigned char) (state[4] ^ mul2[state[5]] ^ mul3[state[6]] ^ state[7]);
    tmp[6] = (unsigned char) (state[4] ^ state[5] ^ mul2[state[6]] ^ mul3[state[7]]);
    tmp[7] = (unsigned char) (mul3[state[4]] ^ state[5] ^ state[6] ^ mul2[state[7]]);

    // Column 3 entries
    tmp[8] = (unsigned char) (mul2[state[8]] ^ mul3[state[9]] ^ state[10] ^ state[11]);
    tmp[9] = (unsigned char) (state[8] ^ mul2[state[9]] ^ mul3[state[10]] ^ state[11]);
    tmp[10] = (unsigned char) (state[8] ^ state[9] ^ mul2[state[10]] ^ mul3[state[11]]);
    tmp[11] = (unsigned char) (mul3[state[8]] ^ state[9] ^ state[10] ^ mul2[state[11]]);

    // Column 4 entries
    tmp[12] = (unsigned char) (mul2[state[12]] ^ mul3[state[13]] ^ state[14] ^ state[15]);
    tmp[13] = (unsigned char) (state[12] ^ mul2[state[13]] ^ mul3[state[14]] ^ state[15]);
    tmp[14] = (unsigned char) (state[12] ^ state[13] ^ mul2[state[14]] ^ mul3[state[15]]);
    tmp[15] = (unsigned char) (mul3[state[12]] ^ state[13] ^ state[14] ^ mul2[state[15]]);

    for (int i = 0; i < 16; i++)
        state[i] = tmp[i];
}

void add_round_key(unsigned char* state, unsigned char* round_key)
{
    for (int i = 0; i < 16; i++)
        state[i] ^= round_key[i];
}

void aes_encrypt(unsigned char* message, unsigned char* key)
{
    unsigned char state[16];

    // Take only the first 16 characters of the message
    for (int i = 0; i < 16; i++)
        state[i] = message[i];

    const unsigned int round_cnt = 9;
    unsigned char expandedKey[176];
    key_expansion(key, expandedKey);
    add_round_key(state, key);

    for (int i = 0; i < round_cnt; i++)
    {
        sub_bytes(state);
        shift_rows(state);
        mix_columns(state);
        add_round_key(state, expandedKey + (16 * (i + 1)));
    }

    // Final round
    sub_bytes(state);
    shift_rows(state);
    add_round_key(state, expandedKey + 160);

    for (int i=0; i<16; i++){
        message[i]=state[i];
    }

}


void print_hex(unsigned char x)
{
    if(x/16 < 10)cout<<(char)((x/16)+ '0');
    if(x/16 >= 10)cout<<(char)((x/16 -10)+'A');

    if(x%16 < 10)cout<<(char)((x%16)+ '0');
    if(x%16 >= 10)cout<<(char)((x%16 -10)+'A');
}



int main()
{
    unsigned char message[] = "This is a message we will encrypt with AES!";
    unsigned char aes_key[16] =
    {
        1,  2,  3,  4,
        5,  6,  7,  8,
        9, 10, 11, 12,
        13, 14, 15, 16,
    };

    int originalLen = strlen((const char*)message);
    int lenOfPaddedMessage = originalLen;

    if (lenOfPaddedMessage % 16){
        lenOfPaddedMessage = (lenOfPaddedMessage / 16 + 1) * 16;
    }

    unsigned char* paddedMessage = new unsigned char[lenOfPaddedMessage];
    for(int i=0; i< lenOfPaddedMessage; i++){
        if (i>=originalLen)paddedMessage[i]=0;
        else paddedMessage[i] = message[i];
    }

    for(int i=0; i< lenOfPaddedMessage; i+=16){
        aes_encrypt(paddedMessage+i, aes_key);
    }

    cout<<"Encrypted message:"<<endl;
    for(int i = 0; i < lenOfPaddedMessage; i++){
        print_hex(paddedMessage[i]);
        cout<<" ";
    }

    return 0;
}
