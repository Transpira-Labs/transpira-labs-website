/*
 * The phone and its Manifest thread. The scroll story drives it from
 * useStoryVals(); the hero shows the same phone held at the "your turn" moment.
 */
import transpiraLogo from "@/assets/transpira-logo.png";
import type { StoryVals } from "./story-logic";

export type PhoneVals = Pick<
  StoryVals,
  | "scChoiceKey"
  | "scEmpty"
  | "scPhoneDisp"
  | "scPhoneRef"
  | "scPhoneS"
  | "scPickA"
  | "scPickB"
  | "scTypingOn"
  | "sp1"
  | "sp2"
  | "sp3"
  | "sp4"
  | "sp5"
  | "spDelivered"
  | "spOpts"
>;

export function StoryPhone({ v }: { v: PhoneVals }) {
  return (
    <div
      style={{
        display: v.scPhoneDisp,
        flex: "none",
        width: "330px",
        height: "690px",
        borderRadius: "50px",
        background: "#fff",
        boxShadow: "0 0 0 10px #0f1513,0 0 0 11px #3a4540,0 40px 100px rgba(0,0,0,.55)",
        overflow: "hidden",
        position: "relative",
        transform: `scale(${v.scPhoneS})`,
        transition: "transform .5s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "110px",
          height: "32px",
          borderRadius: "18px",
          background: "#000",
          zIndex: "3",
        }}
      ></div>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "-apple-system,BlinkMacSystemFont,'Helvetica Neue',system-ui,sans-serif",
          color: "#000",
        }}
      >
        <div
          style={{
            padding: "50px 10px 8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3px",
            borderBottom: ".5px solid #c6c6c8",
            background: "#f7f7f7",
            flex: "none",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 0 0 .5px #c6c6c8",
              display: "grid",
              placeItems: "center",
            }}
          >
            <img
              src={transpiraLogo}
              alt="Transpira"
              style={{ width: "34px", height: "34px", display: "block" }}
            />
          </div>
          <div style={{ fontSize: "11.5px" }}>
            {"Manifest "}
            <span style={{ color: "#8e8e93" }}>›</span>
          </div>
        </div>
        <div
          ref={v.scPhoneRef}
          style={{
            flex: "1",
            overflow: "auto",
            padding: "8px 12px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          {v.scEmpty && (
            <>
              <div
                style={{
                  margin: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div style={{ fontSize: "13px", color: "#8e8e93" }}>No new messages</div>
                {/* A nudge: the story plays as you scroll, so say so. */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    color: "#007aff",
                    animation: "ms-bob 1.6s ease-in-out infinite",
                  }}
                >
                  <span style={{ fontSize: "15px", fontWeight: "600" }}>Keep scrolling</span>
                  <span style={{ fontSize: "22px", lineHeight: "1" }}>↓</span>
                </div>
              </div>
            </>
          )}
          {v.scTypingOn && (
            <>
              <div
                style={{
                  flexShrink: "0",
                  alignSelf: "flex-start",
                  background: "#e9e9eb",
                  padding: "12px 14px",
                  borderRadius: "18px",
                  display: "flex",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#8e8e93",
                    animation: "ms-dcpulse 1.2s infinite",
                  }}
                ></span>
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#8e8e93",
                    animation: "ms-dcpulse 1.2s .2s infinite",
                  }}
                ></span>
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#8e8e93",
                    animation: "ms-dcpulse 1.2s .4s infinite",
                  }}
                ></span>
              </div>
            </>
          )}
          {v.sp1 && (
            <>
              <div
                style={{
                  flexShrink: "0",
                  alignSelf: "center",
                  fontSize: "11px",
                  color: "#8e8e93",
                  padding: "8px 0 2px",
                }}
              >
                Today 8:06 AM
              </div>
              <div
                style={{
                  flexShrink: "0",
                  alignSelf: "flex-start",
                  maxWidth: "80%",
                  background: "#e9e9eb",
                  color: "#000",
                  padding: "8px 13px",
                  borderRadius: "18px",
                  fontSize: "15.5px",
                  lineHeight: "1.32",
                  animation: "ms-dcin .35s 0s ease-out both",
                }}
              >
                Erin wants a price: Kubota tractor, Macon → Raleigh, Thursday. Similar trips went
                for $1,950 to $2,050. I suggest $2,100.
              </div>
              {v.spOpts && (
                <>
                  <div
                    style={{
                      flexShrink: "0",
                      alignSelf: "flex-start",
                      width: "84%",
                      border: ".5px solid #c6c6c8",
                      borderRadius: "16px",
                      overflow: "hidden",
                      background: "#fff",
                      animation: "ms-scring 1.6s ease-in-out infinite",
                    }}
                  >
                    <button
                      type="button"
                      className="ms-reply"
                      onClick={v.scPickA}
                      style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        gap: "10px",
                        padding: "11px 13px",
                        border: "0",
                        background: "#fff",
                        font: "inherit",
                        fontSize: "15.5px",
                        color: "#007aff",
                        cursor: "pointer",
                        textAlign: "left",
                        minHeight: "48px",
                      }}
                    >
                      <span
                        style={{
                          flex: "none",
                          width: "24px",
                          height: "24px",
                          display: "grid",
                          placeItems: "center",
                          fontSize: "12px",
                          fontWeight: "600",
                          background: "#e5f0ff",
                          borderRadius: "12px",
                        }}
                      >
                        A
                      </span>
                      Send $2,100
                    </button>
                    <button
                      type="button"
                      className="ms-reply"
                      onClick={v.scPickB}
                      style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        gap: "10px",
                        padding: "11px 13px",
                        border: "0",
                        borderTop: ".5px solid #e5e5ea",
                        background: "#fff",
                        font: "inherit",
                        fontSize: "15.5px",
                        color: "#007aff",
                        cursor: "pointer",
                        textAlign: "left",
                        minHeight: "48px",
                      }}
                    >
                      <span
                        style={{
                          flex: "none",
                          width: "24px",
                          height: "24px",
                          display: "grid",
                          placeItems: "center",
                          fontSize: "12px",
                          fontWeight: "600",
                          background: "#e5f0ff",
                          borderRadius: "12px",
                        }}
                      >
                        B
                      </span>
                      Send $2,200 instead
                    </button>
                  </div>
                </>
              )}
            </>
          )}
          {v.sp2 && (
            <>
              <div
                style={{
                  flexShrink: "0",
                  alignSelf: "flex-end",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "2px",
                  paddingTop: "4px",
                }}
              >
                <div
                  style={{
                    background: "#007aff",
                    color: "#fff",
                    padding: "7px 15px",
                    borderRadius: "18px",
                    fontSize: "15.5px",
                    animation: "ms-dcin .25s ease-out",
                  }}
                >
                  {v.scChoiceKey}
                </div>
                {v.spDelivered && (
                  <>
                    <div style={{ fontSize: "11px", color: "#8e8e93" }}>Delivered</div>
                  </>
                )}
              </div>
              <div
                style={{
                  flexShrink: "0",
                  alignSelf: "flex-start",
                  maxWidth: "80%",
                  background: "#e9e9eb",
                  color: "#000",
                  padding: "8px 13px",
                  borderRadius: "18px",
                  fontSize: "15.5px",
                  lineHeight: "1.32",
                  animation: "ms-dcin .35s .3s ease-out both",
                }}
              >
                Sent to Erin from your email.
              </div>
            </>
          )}
          {v.sp3 && (
            <>
              <div
                style={{
                  flexShrink: "0",
                  alignSelf: "center",
                  fontSize: "11px",
                  color: "#8e8e93",
                  padding: "8px 0 2px",
                }}
              >
                8:41 AM
              </div>
              <div
                style={{
                  flexShrink: "0",
                  alignSelf: "flex-start",
                  maxWidth: "80%",
                  background: "#e9e9eb",
                  color: "#000",
                  padding: "8px 13px",
                  borderRadius: "18px",
                  fontSize: "15.5px",
                  lineHeight: "1.32",
                  animation: "ms-dcin .35s 0s ease-out both",
                }}
              >
                {"Erin said yes. I posted it for carriers. They'll text me, not you."}
              </div>
            </>
          )}
          {v.sp4 && (
            <>
              <div
                style={{
                  flexShrink: "0",
                  alignSelf: "flex-start",
                  width: "76%",
                  background: "#e9e9eb",
                  borderRadius: "18px",
                  overflow: "hidden",
                  animation: "ms-dcin .4s ease-out",
                }}
              >
                <div
                  style={{
                    height: "62px",
                    background: "#1b2420",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "0 14px",
                  }}
                >
                  <img
                    src={transpiraLogo}
                    alt=""
                    style={{ width: "26px", height: "26px", display: "block" }}
                  />
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#fff" }}>
                    Manifest
                  </span>
                </div>
                <div style={{ padding: "8px 12px 10px" }}>
                  <div style={{ fontSize: "14px", fontWeight: "600" }}>L-2041 · Kubota tractor</div>
                  <div style={{ fontSize: "12px", color: "#8e8e93" }}>manifest.link</div>
                </div>
              </div>
            </>
          )}
          {v.sp5 && (
            <>
              <div
                style={{
                  flexShrink: "0",
                  alignSelf: "center",
                  fontSize: "11px",
                  color: "#8e8e93",
                  padding: "8px 0 2px",
                }}
              >
                11:20 AM
              </div>
              <div
                style={{
                  flexShrink: "0",
                  alignSelf: "flex-end",
                  background: "#007aff",
                  color: "#fff",
                  padding: "8px 14px",
                  borderRadius: "18px",
                  fontSize: "15.5px",
                  lineHeight: "1.3",
                  maxWidth: "78%",
                  animation: "ms-dcin .3s ease-out",
                }}
              >
                Is the Bobcat paperwork done?
              </div>
              <div
                style={{
                  flexShrink: "0",
                  alignSelf: "flex-start",
                  maxWidth: "80%",
                  background: "#e9e9eb",
                  color: "#000",
                  padding: "8px 13px",
                  borderRadius: "18px",
                  fontSize: "15.5px",
                  lineHeight: "1.32",
                  animation: "ms-dcin .35s .5s ease-out both",
                }}
              >
                {
                  "4 of 5. Delta Haul's insurance certificate names the wrong holder. I asked them to fix it at 7:52 and will text you if it isn't in by 3."
                }
              </div>
            </>
          )}
        </div>
        <div
          style={{
            flex: "none",
            padding: "6px 10px 28px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "#e9e9eb",
              color: "#8e8e93",
              display: "grid",
              placeItems: "center",
              fontSize: "20px",
            }}
          >
            +
          </div>
          <div
            style={{
              flex: "1",
              height: "32px",
              border: ".5px solid #c6c6c8",
              borderRadius: "16px",
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              fontSize: "15px",
              color: "#c7c7cc",
            }}
          >
            iMessage
          </div>
        </div>
      </div>
    </div>
  );
}
