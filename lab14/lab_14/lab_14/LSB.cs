using System;
using System.Drawing;
using System.Text;

namespace lab_14
{
    class ImageSteganography
    {
        public enum State
        {
            Hiding,
            FillingWithZeros
        };

        private static int ReverseBits(int n)
        {
            int result = 0;
            for (int i = 0; i < 8; i++)
            {
                result = result * 2 + n % 2;
                n /= 2;
            }
            return result;
        }

        public static Bitmap HideText(string text, Bitmap image)
        {
            State state = State.Hiding;
            int charIndex = 0;
            int charValue = 0;
            long pixelElementIndex = 0;
            int zeros = 0;
            int red = 0, green = 0, blue = 0;
            for (int i = 0; i < image.Height; i++)
            {
                for (int j = 0; j < image.Width; j++)
                {
                    Color pixel = image.GetPixel(j, i);
                    red = pixel.R - pixel.R % 2;
                    green = pixel.G - pixel.G % 2;
                    blue = pixel.B - pixel.B % 2;
                    for (int n = 0; n < 3; n++)
                    {
                        if (pixelElementIndex % 8 == 0)
                        {
                            if (state == State.FillingWithZeros && zeros == 8)
                            {
                                if ((pixelElementIndex - 1) % 3 < 2)
                                {
                                    image.SetPixel(j, i, Color.FromArgb(red, green, blue));
                                }
                                return image;
                            }
                            if (charIndex >= text.Length)
                            {
                                state = State.FillingWithZeros;
                            }
                            else
                            {
                                charValue = text[charIndex++];
                            }
                        }
                        switch (pixelElementIndex % 3)
                        {
                            case 0:
                                {
                                    if (state == State.Hiding)
                                    {
                                        red += charValue % 2;
                                        charValue /= 2;
                                    }
                                }
                                break;
                            case 1:
                                {
                                    if (state == State.Hiding)
                                    {
                                        green += charValue % 2;
                                        charValue /= 2;
                                    }
                                }
                                break;
                            case 2:
                                {
                                    if (state == State.Hiding)
                                    {
                                        blue += charValue % 2;
                                        charValue /= 2;
                                    }
                                    image.SetPixel(j, i, Color.FromArgb(red, green, blue));
                                }
                                break;
                        }
                        pixelElementIndex++;
                        if (state == State.FillingWithZeros)
                        {
                            zeros++;
                        }
                    }
                }
            }
            return image;
        }

        public static string ExtractText(Bitmap image)
        {
            int colorUnitIndex = 0;
            int charValue = 0;
            string extractedText = "";
            for (int i = 0; i < image.Height; i++)
            {
                for (int j = 0; j < image.Width; j++)
                {
                    Color pixel = image.GetPixel(j, i);
                    for (int n = 0; n < 3; n++)
                    {
                        switch (colorUnitIndex % 3)
                        {
                            case 0:
                                {
                                    charValue = charValue * 2 + pixel.R % 2;
                                }
                                break;
                            case 1:
                                {
                                    charValue = charValue * 2 + pixel.G % 2;
                                }
                                break;
                            case 2:
                                {
                                    charValue = charValue * 2 + pixel.B % 2;
                                }
                                break;
                        }
                        colorUnitIndex++;
                        if (colorUnitIndex % 8 == 0)
                        {
                            charValue = ReverseBits(charValue);
                            if (charValue == 0)
                            {
                                return extractedText;
                            }
                            char c = (char)charValue;
                            extractedText += c.ToString();
                        }
                    }
                }
            }
            return extractedText;
        }

        public static Bitmap CreateMatrix(Bitmap image)
        {
            int red = 0, green = 0, blue = 0;
            for (int i = 0; i < image.Height; i++)
            {
                for (int j = 0; j < image.Width; j++)
                {
                    Color pixel = image.GetPixel(j, i);
                    StringBuilder binaryRed = new StringBuilder(Convert.ToString(pixel.R, 2));
                    if (binaryRed[binaryRed.Length - 1] == '0')
                        red = 0;
                    else
                        red = 255;

                    StringBuilder binaryGreen = new StringBuilder(Convert.ToString(pixel.G, 2));
                    if (binaryGreen[binaryGreen.Length - 1] == '0')
                        green = 0;
                    else
                        green = 255;

                    StringBuilder binaryBlue = new StringBuilder(Convert.ToString(pixel.B, 2));
                    if (binaryBlue[binaryBlue.Length - 1] == '0')
                        blue = 0;
                    else
                        blue = 255;
                    image.SetPixel(j, i, Color.FromArgb(red, green, blue));
                }
            }
            return image;
        }
    }
}
