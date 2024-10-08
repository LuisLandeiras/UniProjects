%pc(nome,       cpu,            gpu,        ram,        motherboard,    psu,        disco,        preco)
pc(alien2,      ryzen_7800x,    rx6800xt,   corsair_c,  msi_z,          nox_a,      toshiba_b,    1800).
pc(lenovo1,     i5_13600k,      gf2060,     corsair_a,  asus_tuf,       corsair_b,  samsung_a,    1100).
pc(acer1,       i9_13900k,      gf3080,     corsair_b,  asus_rog,       corsair_a,  toshiba_b,    2200).
pc(cyber1,      i9_13900k,      rx6800xt,   corsair_b,  asus_rog,       corsair_a,  kingstone_b,  2400).
pc(cyber2,      ryzen_9800x,    rx6800xt,   hyperx_c,   msi_z,          corsair_b,  toshiba_b,    2000).
pc(ibuypower1,  i5_13600k,      gf2060,     corsair_c,  asus_tuf,       corsair_b,  samsung_a,    1050).
pc(exa2,        i7_13800k,      rx6800,     hyperx_c,   asus_rog,       corsair_b,  kingstone_b,  1850).
pc(gigabyte1,   i9_13900k,      gf3080,     corsair_a,  gigabyte_aorus, corsair_a,  kingstone_b,  2100).

%cpu(nome, cores, threads, velocidade, socket, consumo)
cpu(i5_13600k, 10, 16, 4.60, lga1700, 100).
cpu(i7_13800k, 18, 20, 5.20, lga1700, 120).
cpu(i9_13900k, 24, 32, 5.80, lga1700, 150).
cpu(r5_5600x, 6, 12, 5.30, am4, 110).
cpu(r7_5800x, 8, 16, 5.00, am4, 120).
cpu(r9_5900x, 12, 24, 5.60, am4, 140).
cpu(ryzen_7800x, 10, 20, 5.20, am4, 130).
cpu(ryzen_9800x, 16, 32, 5.50, am4, 150).

%gpu(nome, vram, velocidade, consumo)
gpu(gf1660ti, 6, 1.8, 130).
gpu(rx6800xt, 16, 2.8, 280).
gpu(gf1660, 6, 1.7, 120).
gpu(gf2060, 6, 1.7, 160).
gpu(gf3080, 10, 1.4, 320).
gpu(rx6700xt, 12, 2.5, 230).
gpu(rx7600xt, 16, 2.4, 190).
gpu(rx580, 8, 1.5, 185).

%motherboard(nome, socket, tamanho)
motherboard(gigabyte_aorus, lga1700, atx).
motherboard(msi_torpedo, lga1700, atx).
motherboard(asus_rog, lga1700, atx).
motherboard(asus_tuf, lga1700, itx).

motherboard(gigabyte_b450, am4, atx).
motherboard(asus_prime, am4, atx).
motherboard(msi_z, am4, atx).
motherboard(asus_strix, am4, itx).

%ram(nome, velocidade, memoria, geracao)
ram(corsair_a, 3200, 16, ddr4).
ram(corsair_b, 3200, 32, ddr4).
ram(corsair_c, 2666, 8, ddr4).
ram(hyperx_a, 3600, 16, ddr4).
ram(hyperx_b, 2800, 16, ddr4).
ram(hyperx_c, 3200, 32, ddr4).

%disco(nome, memoria, tipo)
disco(samsung_a, 256, ssd).
disco(samsung_b, 512, ssd).
disco(kingstone_a, 512, nvme).
disco(kingstone_b, 1024, nvme).
disco(toshiba_a, 512, ssd).
disco(toshiba_b, 512, hdd).

%psu(nome, potencia, qualidade)
psu(corsair_a, 750, diamond).
psu(corsair_b, 550, bronze).
psu(nox_a, 650, gold).
psu(nox_b, 550, gold).
psu(mars_a, 300, bronze).
psu(mars_b, 500, gold).

