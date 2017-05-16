1. Place the story to all.txt
2. Keep only the story lines, Japanese and English (1. Japanese, 2. English 3. empty line)
3. User `awk '!(NR % 3)' all.txt > LANGUAGE.txt` to split the different languages
4. Put a # char in front of te japanese lines and get the romaji from google translate.
5. Put the romajis to romaji.txt file and replace # with \n
6. Get the individual characters, and make sure they're added to the punctuationMarks or kanjis. 'perl -C -ne'print grep {!$a{$_}++} /\X/g' japanese.txt'
