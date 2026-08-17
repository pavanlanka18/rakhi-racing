$ErrorActionPreference = "Continue"

function Download-Image($FileId, $DestPath) {
  $url = "https://lh3.googleusercontent.com/d/$FileId"
  try {
    Invoke-WebRequest -Uri $url -OutFile $DestPath -UseBasicParsing -TimeoutSec 30
    Write-Host "OK  $DestPath"
  } catch {
    Write-Host "FAIL $DestPath"
  }
}

$fantasyIds = @(
  '1EA4B_Y0OShX4LdwVMinG4w5J_Sf_cfNw',
  '14bBDhoZDDd7P2Oz8Yb950Py5hC6sP98e',
  '1rgUsWbDY-bK3PQimY0d7RZoxyVU_M1H-',
  '1vX1GYmyFchR1e-VXrwRgvo9EfKWt0agD',
  '17gQU-b-tMGNvooJRqiK_At_nCBWsasDL',
  '1OLGaLQTLXBtNgPlnISM2MsmFWypMfelL',
  '1Upksvw8YELDis6olhhkXIssvR2WE1hiG',
  '1Ol4ymOJ5B4tWlRgXVwQCQSm9UkeZVRok'
)
$dir = "public\images\products\fantasy"
New-Item -ItemType Directory -Force -Path $dir | Out-Null
for ($i = 0; $i -lt $fantasyIds.Count; $i++) {
  $n = ($i + 1).ToString().PadLeft(2, '0')
  Download-Image $fantasyIds[$i] "$dir\fantasy-$n.png"
}

$f1Ids = @(
  '1w2BRhgHMHnB29tp3cEPVbzX53m56C0tX',
  '12lJVu644JUK7bcNJlTHU_Pa-Ys7AFvvC',
  '1JdqnyI5sV9QcZ_lPkmTnX571kRKcGEPb',
  '1iIZQ95FH5X1P1L-qLKhODh9NdIQ_rnrN',
  '1rz0yT66RVMoLma21nNlhm0cotlqu2NPk',
  '1l0xSnTZSKa0GVM58Xr47IUul2b7hL_lv'
)
$dir = "public\images\products\f1"
New-Item -ItemType Directory -Force -Path $dir | Out-Null
for ($i = 0; $i -lt $f1Ids.Count; $i++) {
  $n = ($i + 1).ToString().PadLeft(2, '0')
  Download-Image $f1Ids[$i] "$dir\f1-$n.png"
}

$premiumIds = @(
  '1Q9AanicisamkJO-i5LGySLTM8qtcpDh2',
  '1EvBCYpl9BGrD47lQk4S95NIgczvJhKn2',
  '19x1wAwOTLqJfpssnfEyEXhU8f-ClcOeF',
  '1lBYf1ybWVYJAsTYDAK7sgV40-zHvMMdI',
  '1ZQnlKbTTRmRWDP9FbYgkNrcgDdFE2enO',
  '1ujXt3c8szZQHZiC2F6oa5GOcoZGnoNlp',
  '12LEYkGIf6ML7nsrR49kknkYhRhPNhGL5',
  '1eBQ94BcsfJJ21WEySijDGrfd6_VWgSGf',
  '1mzVbebRum11hENE_97bIhoDlBNEIVBz_',
  '1bF76eiae2is58n_d142p8kDUKkDrFf0E',
  '1W14zsiBrsmbU_4Bt6jyVap7euGWEuGs6',
  '1GQ4ypdoILTTgNPBLvBiCTq6qagq5Ezcy'
)
$dir = "public\images\products\premium"
New-Item -ItemType Directory -Force -Path $dir | Out-Null
for ($i = 0; $i -lt $premiumIds.Count; $i++) {
  $n = ($i + 1).ToString().PadLeft(2, '0')
  Download-Image $premiumIds[$i] "$dir\premium-$n.png"
}

$sportsIds = @(
  '1F8p063V2u4S7IJhBoAyRnNn1NMVPcq7w',
  '1SfPQ1AnCpr3LNWrByicUK_4UP5_fpM7d',
  '1yYZOk9IFpZWW_Uqd4xC6ulu5i1IQ_Y8e',
  '1RWd6eG7XrsXXpOw3bSnz8SRIvvUppiE2',
  '1XksYFtZd-J1V2UDtNUi46MDLGRQjb4ou',
  '1eViw1KwTHatQn1o8uI-E-ddAlrMyGyjc',
  '1pxbsezqt4AcEsLhfzbqvLRyxqOtPDiXz',
  '1FRyAer-8BT4_FnOU2ecIpaIgW9srm06j',
  '1XV2HK0-5HxLVSOQNbkgUtv1AKcSiCnKk',
  '13DpTJJZzR3SeJ0rPA8bzw6LelzXFJjec',
  '1yCFxesr49eHvotzeL2wUMvyqzvAHmQUI',
  '1jXFmjpOvckuMVyxtETtA9R3L2MNKsvex',
  '17ns5CCHagVSSvz66FtdGt2ruZ3Cxb8DK',
  '13ksxETZNCd3MP6HBgDfpnGpCq1-V6MZD',
  '1F6a7wKrLEMRsLFqnKsD6nF3HXH5irWS3',
  '1AUT3sJIX8fOaHO-Y_BmMAFvhVEayMshu',
  '1za6VwVl2k9bYCz1kNWVETIdYhsiE8v_P',
  '1VENb8NzEc90Dniz6xaJ-oqiciK3YTEbB',
  '14M62twdWgciA1YAY89yTtAayBTnIyCRO',
  '1T6NXnxfVMd0AQJVaBLDDnFxM3qz6Irui',
  '1psg0KkaXrkH0DGkvo7IT2N8664feikt6',
  '1ZgA7amMvLMTCPrZrzBhSdQbzFkzFKUoy',
  '1Oe1FQ_bUTtPS-CB3W5sXX19vp4fEQy6-',
  '1fXT81TG6-wOFYH3eRaqGuUWSr0L0IP7F',
  '1ql4jgECjbifuadPz2eNjPN7rBDRj-wBo',
  '1LA43g1NP5Y7lBxhLPBJnRtKsm-X1rQJQ',
  '1f5F9Q9taaIrDmz-uYr7ONky3CzjuevNX',
  '1hvmm2Vg8Ykjq252tfFCgbExT3-o2A4Th'
)
$dir = "public\images\products\sports"
New-Item -ItemType Directory -Force -Path $dir | Out-Null
for ($i = 0; $i -lt $sportsIds.Count; $i++) {
  $n = ($i + 1).ToString().PadLeft(2, '0')
  Download-Image $sportsIds[$i] "$dir\sports-$n.png"
}

Write-Host "Done!"
