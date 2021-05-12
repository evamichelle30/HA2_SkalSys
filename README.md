# HA2_SkalSys
Anleitung zur Benutzung des Todo Trackers:
Zuerst muss sicher gestellt werden, dass Maven heruntergeladen ist und mindestens JDK 1.8.
Dann muss MySQL laufen und die Datenbank folgender maßen aufgebaut werden:

mysql> create database db_todos; -- Erstellt die Datenbank
mysql> create user 'springuser'@'%' identified by 'Password'; -- Erstellt den Benutzer
mysql> grant all on db_todos.* to 'springuser'@'%'; -- Gibt dem neuen Nutzer alle Rechte für die neue Datenbank

Dann kann auch schon der Server gestartet werden in dem man Run TodoApplication macht.

index.html kann im Browser geöffnet werden und schon kann man Todos hinzufügen, editieren, löschen und sich anzeigen lassen!
