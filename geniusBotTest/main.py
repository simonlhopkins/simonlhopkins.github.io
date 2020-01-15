import lyricsgenius
genius = lyricsgenius.Genius("vBbiQ717mfH5tzWe_-k7Kj0u-dFNyF8-fNGS3LK7mGOAk_n1IYNJvsty1XSn8AK6")
artist = genius.search_artist("Marietta")
print(artist.songs)
