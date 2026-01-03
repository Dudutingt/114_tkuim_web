import os
import sqlite3
import html
from flask import Flask, request, jsonify

APP = Flask(__name__)
OWNER = os.getenv("OWNER", "UNKNOWN")
MODE = os.getenv("MODE", "vuln")  # vuln / patched（僅顯示用）
DB = "users.db"

# in-memory comments (demo)
COMMENTS = []

def q_one(sql: str):
    """
    (舊) 不安全的查詢函式，僅保留供參考
    """
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    cur.execute(sql)
    row = cur.fetchone()
    conn.close()
    return row

def q_one_params(sql: str, params: tuple):
    """
    (新) 安全的查詢函式，支援參數化查詢
    """
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    cur.execute(sql, params)
    row = cur.fetchone()
    conn.close()
    return row

@APP.get("/health")
def health():
    return jsonify({
        "ok": True,
        "owner": OWNER,
        "version": MODE
    }), 200

@APP.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return (
            "<h2>Login</h2>"
            "<form method='POST'>"
            "Username: <input name='username'><br>"
            "Password: <input name='password' type='password'><br><br>"
            "<button type='submit'>Login</button>"
            "</form>"
            "<p><a href='/'>Back</a></p>"
        )

    username = request.form.get("username", "")
    password = request.form.get("password", "")

    # ==========================================================
    # [FIXED] SQL Injection 修補完成
    # 使用 ? 作為佔位符，並透過 q_one_params 傳入參數 tuple
    # ==========================================================
    sql = "SELECT role FROM users WHERE username=? AND password=?"
    row = q_one_params(sql, (username, password))

    if row:
        return jsonify({"login": "ok", "owner": OWNER, "role": row[0]}), 200
    return jsonify({"login": "fail", "owner": OWNER}), 401

@APP.route("/comment", methods=["GET", "POST"])
def comment():
    # ==========================================================
    # [FIXED] XSS 修補完成
    # 輸出前使用 html.escape() 編碼，避免 script 被執行
    # ==========================================================
    if request.method == "POST":
        text = request.form.get("text", "")
        COMMENTS.append(text)

    page = "<h2>Comments</h2><ul>"
    for c in COMMENTS:
        # 這裡加上了 html.escape() 保護
        page += f"<li>{html.escape(c)}</li>"
    page += "</ul>"

    page += (
        "<form method='POST'>"
        "<input name='text' style='width: 360px'>"
        "<button type='submit'>Submit</button>"
        "</form>"
        "<p><a href='/'>Back</a></p>"
    )
    return page

@APP.get("/")
def index():
    # 簡單首頁（含 owner）
    return (
        "<h2>mini-login</h2>"
        f"<p id='owner'>Server Owner: {OWNER}</p>"
        "<ul>"
        "<li>Login: <a href='/login'>/login</a></li>"
        "<li>Comment: <a href='/comment'>/comment</a></li>"
        "<li>Health: <a href='/health'>/health</a></li>"
        "</ul>"
    )

if __name__ == "__main__":
    APP.run(host="0.0.0.0", port=5000, debug=False)