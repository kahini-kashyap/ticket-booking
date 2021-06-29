const express = require("express");
const app = express();
app.use(express.json());
let fs = require("fs");
let port = process.env.PORT || 5000;

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.get("/display", function (req, res) {
    fs.readFile("tickets-left.txt", "utf-8", function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.json({ ticket: data });
        }
    })
})

app.get("/update/:ticket", function (req, res) {
    let ticket = req.params.ticket;
    fs.writeFile("tickets-left.txt", ticket, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({ message: "tickets updated" })
        }

    })

})

app.get("/admin", function (req, res) {
    res.sendFile(__dirname + "/admin.html");
})

app.post("/data", function (req, res) {
    let data = req.body.name + " " + req.body.email + "\n";
    fs.readFile("tickets-left.txt", "utf-8", function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            let ticket = parseInt(data);
            console.log(ticket)
            if (ticket >= 1) {
                fs.appendFile("data.txt", data, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        ticket--;
                        fs.writeFile("tickets-left.txt", ticket.toString(), (err) => {
                            if (err)
                                console.log(err)
                        })
                        res.json({ message: "registration successful" })
                    }
                })
            }
            else {
                res.json({ message: "Tickets are not available" })
            }
        }
    })
})

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("server is running on port" + " " + port);
    }
})