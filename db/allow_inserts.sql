-- Enable Write Access for Dev/Seeding (RLS Policy Fix)
create policy "Public Insert Partners" on circular_partners for
insert with check (true);
create policy "Public Update Partners" on circular_partners for
update using (true);
create policy "Public Insert Transactions" on seeds_transactions for
insert with check (true);
create policy "Public Insert UserAchievements" on user_achievements for
insert with check (true);
create policy "Public Insert Redemptions" on redemptions for
insert with check (true);
create policy "Public Insert Scans" on qr_scans for
insert with check (true);